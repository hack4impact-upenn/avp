'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.isAdmin = void 0;
const apiError_1 = __importDefault(require('../util/apiError'));
/**
 * Middleware to check if a user is an admin using Passport Strategy
 * and creates an {@link ApiError} to pass on to error handlers if not
 */
const isAdmin = (req, res, next) => {
  // Get User
  const user = req.user;
  // Check is user exists and is valid
  if (!user) {
    next(apiError_1.default.unauthorized('Not a valid user.')); // TODO: see if this is the correct message
    return;
  }
  // Check if the user is an admin
  if (user.admin) {
    next();
  } else {
    next(apiError_1.default.unauthorized('Need admin status.'));
  }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=admin.middleware.js.map
