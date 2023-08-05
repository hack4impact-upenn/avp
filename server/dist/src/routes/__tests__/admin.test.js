"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoConnection_1 = __importDefault(require("../../config/mongoConnection"));
const createExpressApp_1 = __importDefault(require("../../config/createExpressApp"));
const statusCode_1 = __importDefault(require("../../util/statusCode"));
const user_model_1 = require("../../models/user.model");
const session_model_1 = __importDefault(require("../../models/session.model"));
let dbConnection;
let sessionStore;
let app;
let server;
let agent;
const cleanMongoObjArr = (objArr) => {
    const dup = objArr.map((obj) => {
        const copy = Object.assign({}, obj);
        delete copy._id;
        delete copy.__v;
        return copy;
    });
    return dup;
};
const testEmail = 'example@gmail.com';
const testPassword = '123456';
const testFirstName = 'testFirst';
const testLastName = 'testLast';
const user1 = {
    email: testEmail,
    firstName: testFirstName,
    lastName: testLastName,
    admin: true,
    verified: true,
    department: 'None',
};
const testEmail2 = 'testemail2@gmail.com';
const testPassword2 = '123456';
const testFirstName2 = 'test2First';
const testLastName2 = 'test3Last';
const user2 = {
    email: testEmail2,
    firstName: testFirstName2,
    lastName: testLastName2,
    admin: false,
    verified: true,
    department: 'None',
};
const testEmail3 = 'testemail3@gmail.com';
const testPassword3 = '123456';
const testFirstName3 = 'test3First';
const testLastName3 = 'test3Last';
const user3 = {
    email: testEmail3,
    firstName: testFirstName3,
    lastName: testLastName3,
    admin: true,
    verified: true,
    department: 'None',
};
const testEmail4 = 'testemail4@gmail.com';
const testPassword4 = '123456';
const testFirstName4 = 'test4First';
const testLastName4 = 'test4Last';
const user4 = {
    email: testEmail4,
    firstName: testFirstName4,
    lastName: testLastName4,
    admin: false,
    verified: true,
    department: 'None',
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // connects to an in memory database since this is a testing environment
    dbConnection = yield mongoConnection_1.default.getInstance();
    dbConnection.open();
    sessionStore = dbConnection.createSessionStore(); // for storing user sessions in the db
    app = (0, createExpressApp_1.default)(sessionStore); // instantiate express app
    server = app.listen(); // instantiate server to listen on some unused port
    agent = supertest_1.default.agent(server); // instantiate supertest agent
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    sessionStore.close();
    dbConnection.close();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Clear the database before each test
    dbConnection.clearInMemoryCollections();
}));
describe('testing admin routes', () => {
    describe('testing admin routes as admin', () => {
        // Want to log in a user and promote them to admin before each of these tests
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            // Register users
            let response = yield agent.post('/api/auth/register').send({
                email: testEmail,
                password: testPassword,
                firstName: testFirstName,
                lastName: testLastName,
            });
            expect(response.status).toBe(statusCode_1.default.CREATED);
            expect(yield user_model_1.User.findOne({ email: testEmail })).toBeTruthy();
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            response = yield agent.post('/api/auth/register').send({
                email: testEmail2,
                password: testPassword2,
                firstName: testFirstName2,
                lastName: testLastName2,
            });
            expect(response.status).toBe(statusCode_1.default.CREATED);
            expect(yield user_model_1.User.findOne({ email: testEmail2 })).toBeTruthy();
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            response = yield agent.post('/api/auth/register').send({
                email: testEmail3,
                password: testPassword3,
                firstName: testFirstName3,
                lastName: testLastName3,
            });
            expect(response.status).toBe(statusCode_1.default.CREATED);
            expect(yield user_model_1.User.findOne({ email: testEmail3 })).toBeTruthy();
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            response = yield agent.post('/api/auth/register').send({
                email: testEmail4,
                password: testPassword4,
                firstName: testFirstName4,
                lastName: testLastName4,
            });
            expect(response.status).toBe(statusCode_1.default.CREATED);
            expect(yield user_model_1.User.findOne({ email: testEmail4 })).toBeTruthy();
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            // Login user3, promote to admin, and then logout
            response = yield agent.post('/api/auth/login').send({
                email: testEmail3,
                password: testPassword3,
            });
            expect(response.status).toBe(statusCode_1.default.OK);
            expect(yield session_model_1.default.countDocuments()).toBe(1);
            // Promote user3 to admin
            response = yield agent.put('/api/admin/autopromote').send({
                email: testEmail3,
            });
            expect(response.status).toBe(statusCode_1.default.OK);
            const admin3 = yield user_model_1.User.findOne({ email: testEmail3 });
            expect(admin3).toBeTruthy();
            expect(admin3.admin).toBeTruthy();
            // Logout user3
            response = yield agent.post('/api/auth/logout');
            expect(response.status).toBe(statusCode_1.default.OK);
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            // Login user 1 and promote to admin
            response = yield agent.post('/api/auth/login').send({
                email: testEmail,
                password: testPassword,
            });
            expect(response.status).toBe(statusCode_1.default.OK);
            expect(yield session_model_1.default.countDocuments()).toBe(1);
            // Promote user to admin
            response = yield agent.put('/api/admin/autopromote').send({
                email: testEmail,
            });
            expect(response.status).toBe(statusCode_1.default.OK);
            const admin = yield user_model_1.User.findOne({ email: testEmail });
            expect(admin).toBeTruthy();
            expect(admin.admin).toBeTruthy();
        }));
        describe('testing GET /api/admin/users', () => {
            it('admin can get all users', () => __awaiter(void 0, void 0, void 0, function* () {
                // get all users
                const response = yield agent.get('/api/admin/all').send();
                expect(response.status).toBe(statusCode_1.default.OK);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user1);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user2);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user3);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user4);
            }));
        });
        describe('testing GET /api/admin/adminstatus', () => {
            it('admin calling /adminstatus is true', () => __awaiter(void 0, void 0, void 0, function* () {
                // check admin status
                const response = yield agent.get('/api/admin/adminstatus').send();
                expect(response.status).toBe(statusCode_1.default.OK);
            }));
        });
        describe('testing PUT /api/admin/promote', () => {
            it('admin can promote user', () => __awaiter(void 0, void 0, void 0, function* () {
                // promote user
                const response = yield agent
                    .put('/api/admin/promote')
                    .send({ email: testEmail2 });
                expect(response.status).toBe(statusCode_1.default.OK);
                const newAdmin = yield user_model_1.User.findOne({ email: testEmail2 });
                expect(newAdmin).toBeTruthy();
                expect(newAdmin.admin).toBeTruthy();
            }));
            it('admin promoting non-existant user throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                // promote user
                const response = yield agent
                    .put('/api/admin/promote')
                    .send({ email: 'emaildoesnotexist@gmail.com' });
                expect(response.status).toBe(statusCode_1.default.NOT_FOUND);
            }));
            it('admin promoting self throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                // promote user
                const response = yield agent
                    .put('/api/admin/promote')
                    .send({ email: testEmail });
                expect(response.status).toBe(statusCode_1.default.BAD_REQUEST);
            }));
            it('admin promoting admin throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                // promote user
                const response = yield agent
                    .put('/api/admin/promote')
                    .send({ email: testEmail3 });
                expect(response.status).toBe(statusCode_1.default.BAD_REQUEST);
            }));
            it('promoting without sending body throws email', () => __awaiter(void 0, void 0, void 0, function* () {
                // promote user
                const response = yield agent.put('/api/admin/promote').send();
                expect(response.status).toBe(statusCode_1.default.BAD_REQUEST);
            }));
        });
        describe('testing DELETE /api/admin/:email', () => {
            it('admin deleting user removes user', () => __awaiter(void 0, void 0, void 0, function* () {
                // delete user
                let response = yield agent.delete(`/api/admin/${testEmail4}`).send();
                expect(response.status).toBe(statusCode_1.default.OK);
                // check that user was deleted
                response = yield agent.get('/api/admin/all').send();
                expect(response.status).toBe(statusCode_1.default.OK);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user1);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user2);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user3);
                expect(cleanMongoObjArr(response.body)).not.toContainEqual(user4);
            }));
            it('admin attempting to delete self throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                let response = yield agent.delete(`/api/admin/${testEmail}`).send();
                expect(response.status).toBe(statusCode_1.default.BAD_REQUEST);
                response = yield agent.get('/api/admin/all').send();
                expect(response.status).toBe(statusCode_1.default.OK);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user1);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user2);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user3);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user4);
            }));
            it('admin attempting to delete other admin throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                let response = yield agent.delete(`/api/admin/${testEmail3}`).send();
                expect(response.status).toBe(statusCode_1.default.FORBIDDEN);
                response = yield agent.get('/api/admin/all').send();
                expect(response.status).toBe(statusCode_1.default.OK);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user1);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user2);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user3);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user4);
            }));
            it('deleting non-existent user throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                let response = yield agent.delete(`/api/admin/notexistent`).send();
                expect(response.status).toBe(statusCode_1.default.NOT_FOUND);
                response = yield agent.get('/api/admin/all').send();
                expect(response.status).toBe(statusCode_1.default.OK);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user1);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user2);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user3);
                expect(cleanMongoObjArr(response.body)).toContainEqual(user4);
            }));
        });
    });
    describe('testing admin routes as non-admin', () => {
        // Want to log in a user and promote them to admin before each of these tests
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            // Register users
            let response = yield agent.post('/api/auth/register').send({
                email: testEmail,
                password: testPassword,
                firstName: testFirstName,
                lastName: testLastName,
            });
            expect(response.status).toBe(statusCode_1.default.CREATED);
            expect(yield user_model_1.User.findOne({ email: testEmail })).toBeTruthy();
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            response = yield agent.post('/api/auth/register').send({
                email: testEmail2,
                password: testPassword2,
                firstName: testFirstName2,
                lastName: testLastName2,
            });
            expect(response.status).toBe(statusCode_1.default.CREATED);
            expect(yield user_model_1.User.findOne({ email: testEmail2 })).toBeTruthy();
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            response = yield agent.post('/api/auth/register').send({
                email: testEmail3,
                password: testPassword3,
                firstName: testFirstName3,
                lastName: testLastName3,
            });
            expect(response.status).toBe(statusCode_1.default.CREATED);
            expect(yield user_model_1.User.findOne({ email: testEmail3 })).toBeTruthy();
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            response = yield agent.post('/api/auth/register').send({
                email: testEmail4,
                password: testPassword4,
                firstName: testFirstName4,
                lastName: testLastName4,
            });
            expect(response.status).toBe(statusCode_1.default.CREATED);
            expect(yield user_model_1.User.findOne({ email: testEmail4 })).toBeTruthy();
            expect(yield session_model_1.default.countDocuments()).toBe(0);
            // Login user1
            response = yield agent.post('/api/auth/login').send({
                email: testEmail,
                password: testPassword,
            });
            expect(response.status).toBe(statusCode_1.default.OK);
            expect(yield session_model_1.default.countDocuments()).toBe(1);
        }));
        describe('testing GET /api/admin/users', () => {
            it('non admin cannot get all users', () => __awaiter(void 0, void 0, void 0, function* () {
                // get all users
                const response = yield agent.get('/api/admin/all').send();
                expect(response.status).toBe(statusCode_1.default.UNAUTHORIZED);
            }));
        });
        describe('testing GET /api/admin/adminstatus', () => {
            it('non admin calling /adminstatus throwsError', () => __awaiter(void 0, void 0, void 0, function* () {
                // check admin status
                const response = yield agent.get('/api/admin/adminstatus').send();
                expect(response.status).toBe(statusCode_1.default.UNAUTHORIZED);
            }));
        });
        describe('testing PUT /api/admin/promote', () => {
            it('nonadmin attempting to promote user throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                // promote user
                const response = yield agent
                    .put('/api/admin/promote')
                    .send({ email: testEmail2 });
                expect(response.status).toBe(statusCode_1.default.UNAUTHORIZED);
            }));
        });
        describe('testing DELETE /api/admin/:email', () => {
            it('non admin attempting to delete user throws error', () => __awaiter(void 0, void 0, void 0, function* () {
                // delete user
                const response = yield agent.delete(`/api/admin/${testEmail4}`).send();
                expect(response.status).toBe(statusCode_1.default.UNAUTHORIZED);
            }));
        });
    });
});
//# sourceMappingURL=admin.test.js.map