/**
 * A custom class extending {@link Error} for defining and handling errors
 * in a consistent manner throughout the server.
 */
declare class ApiError extends Error {
    code: number;
    additionalInfo: any;
    /**
     * The constructor for any type of {@link ApiError}
     * @param code The HTTP status code corrsponding to the error
     * @param message A message describing the error
     * @param additionalInfo Any useful additional info to include in the error
     */
    constructor(code: number, message: string, additionalInfo?: any);
    /**
     * Creates a 400 Bad Request Error
     * @param message A message describing the error
     * @returns An {@link ApiError} with the appropriate status code
     */
    static badRequest(message: string): ApiError;
    /**
     * Creates a 400 Bad Request Error with a messsage specifying the
     * required fields in the request body.
     * @param requiredFields The list of required fields
     * @returns An {@link ApiError} with the appropriate status code and message
     */
    static missingFields(requiredFields: string[]): ApiError;
    /**
     * Creates a 400 Bad Request Error with a messsage specifying the
     * required fields in the request body and which ones in specific are missing.
     * @param requiredFields The list of required fields
     * @returns An {@link ApiError} with the appropriate status code and message
     */
    static missingFieldsSpecific(requiredFields: string[]): ApiError;
    /**
     * Creates a 401 Unauthorized Error
     * @param message A message describing the error
     * @returns An {@link ApiError} with the appropriate status code
     */
    static unauthorized(message: string): ApiError;
    /**
     * Creates a 403 Forbidden Error
     * @param message A message describing the error
     * @returns An {@link ApiError} with the appropriate status code
     */
    static forbidden(message: string): ApiError;
    /**
     * Creates a 404 Not Found Error
     * @param message A message describing the error
     * @returns An {@link ApiError} with the appropriate status code
     */
    static notFound(message: string): ApiError;
    /**
     * Creates a 500 Internal Server Error
     * @param message A message describing the error
     * @returns An {@link ApiError} with the appropriate status code
     */
    static internal(message: string): ApiError;
}
export default ApiError;
//# sourceMappingURL=apiError.d.ts.map