"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines the Session model for the database, which stores information
 * about user sessions, and also the interface to access the model in TypeScript.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const SessionSchema = new mongoose_1.default.Schema({
    expires: {
        type: Date,
        required: true,
    },
    session: {
        type: String,
        required: true,
    },
});
const Session = mongoose_1.default.model('Session', SessionSchema);
exports.default = Session;
//# sourceMappingURL=session.model.js.map