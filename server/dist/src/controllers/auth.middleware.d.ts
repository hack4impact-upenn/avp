/**
 * All the middleware functions related to authentication
 */
import express from 'express';
/**
 * Middleware to check if a user is authenticated using any Passport Strategy
 * and creates an {@link ApiError} to pass on to error handlers if not
 */
declare const isAuthenticated: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => void;
export { isAuthenticated };
//# sourceMappingURL=auth.middleware.d.ts.map
