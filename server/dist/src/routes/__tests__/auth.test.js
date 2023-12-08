'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const mongoConnection_1 = __importDefault(
  require('../../config/mongoConnection'),
);
const createExpressApp_1 = __importDefault(
  require('../../config/createExpressApp'),
);
const statusCode_1 = __importDefault(require('../../util/statusCode'));
const user_model_1 = require('../../models/user.model');
const session_model_1 = __importDefault(require('../../models/session.model'));
let dbConnection;
let sessionStore;
let app;
let server;
let agent;
const testEmail = 'example@gmail.com';
const testPassword = '123456';
const testFirstName = 'testFirst';
const testLastName = 'testLast';
beforeAll(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    // connects to an in memory database since this is a testing environment
    dbConnection = yield mongoConnection_1.default.getInstance();
    dbConnection.open();
    sessionStore = dbConnection.createSessionStore(); // for storing user sessions in the db
    app = (0, createExpressApp_1.default)(sessionStore); // instantiate express app
    server = app.listen(); // instantiate server to listen on some unused port
    agent = supertest_1.default.agent(server); // instantiate supertest agent
  }),
);
afterAll(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    sessionStore.close();
    dbConnection.close();
  }),
);
beforeEach(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Clear the database before each test
    dbConnection.clearInMemoryCollections();
  }),
);
describe('testing authentication routes', () => {
  describe('standalone calls to routes', () => {
    describe('/register', () => {
      it('registering returns 201 CREATED', () =>
        __awaiter(void 0, void 0, void 0, function* () {
          const response = yield agent.post('/api/auth/register').send({
            email: testEmail,
            password: testPassword,
            firstName: testFirstName,
            lastName: testLastName,
          });
          expect(response.status).toBe(statusCode_1.default.CREATED);
          expect(yield session_model_1.default.countDocuments()).toBe(0);
          const user = yield user_model_1.User.findOne({ email: testEmail });
          expect(user).toBeTruthy();
          expect(user === null || user === void 0 ? void 0 : user.email).toBe(
            testEmail,
          );
          expect(
            user === null || user === void 0 ? void 0 : user.firstName,
          ).toBe(testFirstName);
          expect(
            user === null || user === void 0 ? void 0 : user.lastName,
          ).toBe(testLastName);
        }));
    });
    describe('/login', () => {
      it('login before register returns 401 UNAUTHORIZED', () =>
        __awaiter(void 0, void 0, void 0, function* () {
          const response = yield agent.post('/api/auth/login').send({
            email: testEmail,
            password: testPassword,
          });
          expect(response.status).toBe(statusCode_1.default.UNAUTHORIZED);
          expect(yield session_model_1.default.countDocuments()).toBe(0);
        }));
    });
    describe('/logout', () => {
      it('logging out before register + login returns 401 UNAUTHORIZED', () =>
        __awaiter(void 0, void 0, void 0, function* () {
          const response = yield agent.post('/api/auth/logout');
          expect(response.status).toBe(statusCode_1.default.UNAUTHORIZED);
          expect(yield session_model_1.default.countDocuments()).toBe(0);
        }));
    });
  });
  describe('once registered', () => {
    beforeEach(() =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Register user and expect 201
        const response = yield agent.post('/api/auth/register').send({
          email: testEmail,
          password: testPassword,
          firstName: testFirstName,
          lastName: testLastName,
        });
        expect(response.status).toBe(statusCode_1.default.CREATED);
        expect(
          yield user_model_1.User.findOne({ email: testEmail }),
        ).toBeTruthy();
        expect(yield session_model_1.default.countDocuments()).toBe(0);
      }),
    );
    it('logging in with incorect credentials returns 401 UNAUTHORIZED', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Try to login with wrong password and expect 401 UNAUTHORIZED
        const response = yield agent.post('/api/auth/login').send({
          email: testEmail,
          password: 'differentThanTestPassword',
        });
        expect(response.status).toBe(statusCode_1.default.UNAUTHORIZED);
        expect(yield session_model_1.default.countDocuments()).toBe(0);
      }));
    it('registering with the same email returns 400 BAD_REQUEST', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Register user again and expect 400
        const response = yield agent.post('/api/auth/register').send({
          email: testEmail,
          password: 'differentThanTestPassword',
          firstName: testFirstName,
          lastName: testLastName,
        });
        expect(response.status).toBe(statusCode_1.default.BAD_REQUEST);
        expect(yield session_model_1.default.countDocuments()).toBe(0);
      }));
    it('logging out before login returns 401 UNAUTHORIZED', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/api/auth/logout');
        expect(response.status).toBe(statusCode_1.default.UNAUTHORIZED);
        expect(yield session_model_1.default.countDocuments()).toBe(0);
      }));
    it('logging in with correct credentials returns 200 OK', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Login user
        const response = yield agent.post('/api/auth/login').send({
          email: testEmail,
          password: testPassword,
        });
        expect(response.status).toBe(statusCode_1.default.OK);
        expect(yield session_model_1.default.countDocuments()).toBe(1);
      }));
  });
  describe('once logged in', () => {
    // Want to log in a user before each of these tests
    beforeEach(() =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Register user
        let response = yield agent.post('/api/auth/register').send({
          email: testEmail,
          password: testPassword,
          firstName: testFirstName,
          lastName: testLastName,
        });
        expect(response.status).toBe(statusCode_1.default.CREATED);
        expect(
          yield user_model_1.User.findOne({ email: testEmail }),
        ).toBeTruthy();
        expect(yield session_model_1.default.countDocuments()).toBe(0);
        // Login user
        response = yield agent.post('/api/auth/login').send({
          email: testEmail,
          password: testPassword,
        });
        expect(response.status).toBe(statusCode_1.default.OK);
        expect(yield session_model_1.default.countDocuments()).toBe(1);
      }),
    );
    it('logging in again returns 400 BAD_REQUEST', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Login again
        const response = yield agent.post('/api/auth/login').send({
          email: testEmail,
          password: testPassword,
        });
        expect(response.status).toBe(statusCode_1.default.BAD_REQUEST);
        expect(yield session_model_1.default.countDocuments()).toBe(1);
      }));
    it('registering any user returns 400 BAD_REQUEST', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/api/auth/register').send({
          email: 'differentThanTestEmail',
          password: testPassword,
          firstName: testFirstName,
          lastName: testLastName,
        });
        expect(response.status).toBe(statusCode_1.default.BAD_REQUEST);
        expect(
          yield user_model_1.User.findOne({ email: testEmail }),
        ).toBeTruthy();
        expect(yield session_model_1.default.countDocuments()).toBe(1);
      }));
    it('logging out returns 200 OK', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Logout user
        const response = yield agent.post('/api/auth/logout');
        expect(response.status).toBe(statusCode_1.default.OK);
        expect(yield session_model_1.default.countDocuments()).toBe(0);
      }));
    it('logging out and logging in with correct credentials returns 200 OK', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Logout user
        let response = yield agent.post('/api/auth/logout');
        expect(response.status).toBe(statusCode_1.default.OK);
        expect(yield session_model_1.default.countDocuments()).toBe(0);
        // Login again
        response = yield agent.post('/api/auth/login').send({
          email: testEmail,
          password: testPassword,
        });
        expect(response.status).toBe(statusCode_1.default.OK);
        expect(yield session_model_1.default.countDocuments()).toBe(1);
      }));
    it('logging out then register+login with new email returns 200 OK', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        // Logout user
        let response = yield agent.post('/api/auth/logout');
        expect(response.status).toBe(statusCode_1.default.OK);
        expect(yield session_model_1.default.countDocuments()).toBe(0);
        // Register
        response = yield agent.post('/api/auth/register').send({
          email: 'differentThanTestEmail@gmail.com',
          password: testPassword,
          firstName: testFirstName,
          lastName: testLastName,
        });
        expect(response.status).toBe(statusCode_1.default.CREATED);
        expect(yield session_model_1.default.countDocuments()).toBe(0);
        // Login
        response = yield agent.post('/api/auth/login').send({
          email: testEmail,
          password: testPassword,
        });
        expect(response.status).toBe(statusCode_1.default.OK);
        expect(yield session_model_1.default.countDocuments()).toBe(1);
      }));
  });
});
//# sourceMappingURL=auth.test.js.map
