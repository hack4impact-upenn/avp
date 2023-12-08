'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.isAuthenticated = void 0;
const apiError_1 = __importDefault(require('../util/apiError'));
/**
 * Middleware to check if a user is authenticated using any Passport Strategy
 * and creates an {@link ApiError} to pass on to error handlers if not
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // Go to the next non-error-handling middleware
    return;
  }
  // Providing a parameter means go to the next error handler
  next(apiError_1.default.unauthorized('Must be logged in.'));
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=auth.middleware.js.map
