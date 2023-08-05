/**
 * All the middleware functions related to admin users
 */
import express from 'express';
/**
 * Middleware to check if a user is an admin using Passport Strategy
 * and creates an {@link ApiError} to pass on to error handlers if not
 */
declare const isAdmin: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export { isAdmin };
//# sourceMappingURL=admin.middleware.d.ts.map