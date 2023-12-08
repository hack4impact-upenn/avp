'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const statusCode_1 = __importDefault(require('./statusCode'));
/**
 * A custom class extending {@link Error} for defining and handling errors
 * in a consistent manner throughout the server.
 */
class ApiError extends Error {
  /**
   * The constructor for any type of {@link ApiError}
   * @param code The HTTP status code corrsponding to the error
   * @param message A message describing the error
   * @param additionalInfo Any useful additional info to include in the error
   */
  constructor(code, message, additionalInfo = {}) {
    super(message);
    this.code = code;
    this.message = message;
    this.additionalInfo = additionalInfo;
  }
  //           Static functions for creating commonly used errors             //
  /**
   * Creates a 400 Bad Request Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static badRequest(message) {
    return new ApiError(statusCode_1.default.BAD_REQUEST, message);
  }
  /**
   * Creates a 400 Bad Request Error with a messsage specifying the
   * required fields in the request body.
   * @param requiredFields The list of required fields
   * @returns An {@link ApiError} with the appropriate status code and message
   */
  static missingFields(requiredFields) {
    return new ApiError(
      statusCode_1.default.BAD_REQUEST,
      `Request body needs the following fields: ${requiredFields.join(', ')}.`,
      requiredFields,
    );
  }
  /**
   * Creates a 400 Bad Request Error with a messsage specifying the
   * required fields in the request body and which ones in specific are missing.
   * @param requiredFields The list of required fields
   * @returns An {@link ApiError} with the appropriate status code and message
   */
  static missingFieldsSpecific(requiredFields) {
    return new ApiError(
      statusCode_1.default.BAD_REQUEST,
      `Request body needs the following fields: ${requiredFields.join(', ')}.`,
    );
  }
  /**
   * Creates a 401 Unauthorized Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static unauthorized(message) {
    return new ApiError(statusCode_1.default.UNAUTHORIZED, message);
  }
  /**
   * Creates a 403 Forbidden Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static forbidden(message) {
    return new ApiError(statusCode_1.default.FORBIDDEN, message);
  }
  /**
   * Creates a 404 Not Found Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static notFound(message) {
    return new ApiError(statusCode_1.default.NOT_FOUND, message);
  }
  /**
   * Creates a 500 Internal Server Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static internal(message) {
    return new ApiError(statusCode_1.default.INTERNAL_SERVER_ERROR, message);
  }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map
