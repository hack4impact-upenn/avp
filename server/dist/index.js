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
const mongoConnection_1 = __importDefault(require("./src/config/mongoConnection"));
const createExpressApp_1 = __importDefault(require("./src/config/createExpressApp"));
require("dotenv/config");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Listen for termination
    process.on('SIGTERM', () => process.exit());
    // Set up the datbase connection
    const dbConnection = yield mongoConnection_1.default.getInstance();
    dbConnection.open();
    // Instantiate express app with configured routes and middleware
    const app = (0, createExpressApp_1.default)(dbConnection.createSessionStore());
    const port = process.env.PORT || 3000;
    // Instantiate a server to listen on a specified port
    // UNCOMMENT FOR PROD
    app.listen(app.get('port'), () => {
        console.log(`Listening on port ${app.get('port')} 🚀`);
        console.log('  Press Control-C to stop\n');
    });
    // app.listen(3000, '0.0.0.0');
});
// Run the server
main();
//# sourceMappingURL=index.js.map