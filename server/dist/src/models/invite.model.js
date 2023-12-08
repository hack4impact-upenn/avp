'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Invite = void 0;
/**
 * Defines the Invite model for the database and also the interface to
 * access the model in TypeScript.
 */
const mongoose_1 = __importDefault(require('mongoose'));
const InviteSchema = new mongoose_1.default.Schema({
  email: {
    type: String,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
  },
  verificationToken: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
});
const Invite = mongoose_1.default.model('Invite', InviteSchema);
exports.Invite = Invite;
//# sourceMappingURL=invite.model.js.map
