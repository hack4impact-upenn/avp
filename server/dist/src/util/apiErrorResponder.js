'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const apiError_1 = __importDefault(require('./apiError'));
const statusCode_1 = __importDefault(require('./statusCode'));
/**
 * The final error handler for all errors encountered in the server. Responsible
 * for what is ultimately sent to the client, allowing the prevention of
 * sensitive server information leaking.
 * @param err The error propogated by a previous route handler. Could be an
 * {@link Error} or a custom {@link ApiError}
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction provided by Express
 */
const apiErrorResponder = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next,
) => {
  // .send() populates res.error.response.data
  if (err instanceof apiError_1.default) {
    res.status(err.code).send({ message: err.message });
    return;
  }
  // Generic error to return
  res
    .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
    .send({ message: err.message });
};
exports.default = apiErrorResponder;
//# sourceMappingURL=apiErrorResponder.js.map
