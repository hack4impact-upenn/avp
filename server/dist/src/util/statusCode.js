"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Common status codes. Listed here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
var StatusCode;
(function (StatusCode) {
    // Successful
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    // Client Error
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    // Server Error
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusCode || (StatusCode = {}));
exports.default = StatusCode;
//# sourceMappingURL=statusCode.js.map