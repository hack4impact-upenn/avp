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
const mongoose_1 = __importDefault(require('mongoose'));
const mongodb_memory_server_1 = require('mongodb-memory-server');
require('dotenv/config');
const connect_mongo_1 = __importDefault(require('connect-mongo'));
/* uncomment for database logger */
// mongoose.set('debug', process.env.DEBUG !== 'production');
// Options for the mongodb connection
const opts = {
  // keepAlive is a feature true by default in MongoDB which allows for long TCP connections which allows for long running applications.
  // keepAliveInitialDelay causes keepAlive to start after 300000 milliseconds to prevent excessive network traffic
  keepAliveInitialDelay: 300000,
  // the amount of time in milliseconds Mongoose will spend attempting to connect to a valid server.
  serverSelectionTimeoutMS: 5000,
  // how long mongoose will wait after opening a socket
  // This should be set to 2x-3x the slowest operation.
  socketTimeoutMS: 45000,
};
/**
 * The class for creating, using, and closing the single connection to the
 * MongoDB database this server is configured for. If in a testing environment,
 * the database will be in memory instead of linking to the URI specified by
 * the .env file.
 */
class MongoConnection {
  constructor(mongoUrl, memoryServer = null) {
    this.mongoUri = mongoUrl;
    this.mongoMemoryServer = memoryServer;
  }
  static getInstance() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!MongoConnection.instance) {
        // If in a testing environment, create an in memory database to connect to
        if (process.env.NODE_ENV === 'test') {
          const mongod =
            yield mongodb_memory_server_1.MongoMemoryServer.create();
          MongoConnection.instance = new MongoConnection(
            mongod.getUri(),
            mongod,
          );
        } else {
          MongoConnection.instance = new MongoConnection(
            process.env.ATLAS_URI || 'NO ATLAS_URI IN .ENV',
          );
        }
      }
      return MongoConnection.instance;
    });
  }
  /**
   * Opens a connection to the MongoDB database the project is configured for
   */
  open() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        mongoose_1.default
          .connect(this.mongoUri, opts)
          .catch((e) =>
            console.error(
              `Connection to MongoDB failed at: ${this.mongoUri}. ` +
                `Please check your env file to ensure you have the correct link. \n`,
              e,
            ),
          );
        mongoose_1.default.connection.on('connected', () => {
          console.log('MongoDB: Connected ✅');
        });
        mongoose_1.default.connection.on('disconnected', () => {
          if (process.env.NODE_ENV === 'test') {
            return; // Can't log after tests are done, Jest fails
          }
          console.log('MongoDB: Disconnected 🛑');
        });
        mongoose_1.default.connection.on('error', (err) => {
          console.log(`ERROR MongoDB: `, err);
          if (err.name === 'MongoNetworkError') {
            setTimeout(
              () => mongoose_1.default.connect(this.mongoUri, opts),
              5000,
            );
          }
        });
      } catch (err) {
        console.log('ERROR while opening: ', err);
        throw err;
      }
    });
  }
  /**
   * Clears all the collections of the {@link MongoMemoryServer} the
   * instance is connected to. If not connected to an in memory server, nothing
   * occurs. Useful to call in between tests.
   */
  clearInMemoryCollections() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.mongoMemoryServer && mongoose_1.default.connection.db) {
        const collections =
          yield mongoose_1.default.connection.db.collections();
        Object.values(collections).forEach((collection) =>
          __awaiter(this, void 0, void 0, function* () {
            yield collection.deleteMany({}); // No filter deletes all documents
          }),
        );
      }
    });
  }
  /**
   * @returns A new {@link MongoStore} instance for storing user sessions in
   * the instance's database
   */
  createSessionStore() {
    return new connect_mongo_1.default({ mongoUrl: this.mongoUri });
  }
  /**
   * Closes the connection to the MongoDB database for the instance
   */
  close() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield mongoose_1.default.disconnect();
        if (process.env.NODE_ENV === 'test') {
          yield this.mongoMemoryServer.stop();
        }
      } catch (err) {
        console.log('db.close: ', err);
        throw err;
      }
    });
  }
}
exports.default = MongoConnection;
//# sourceMappingURL=mongoConnection.js.map
