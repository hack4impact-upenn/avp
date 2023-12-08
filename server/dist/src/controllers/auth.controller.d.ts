/**
 * All the controller functions containing the logic for routes relating to a
 * user's authentication such as login, logout, and registration.
 */
import express from 'express';
/**
 * A controller function to login a user and create a session with Passport.
 * On success, the user's information is returned.
 * Else, send an appropriate error message.
 */
declare const login: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
/**
 * A controller function to logout a user with Passport and clear the session.
 */
declare const logout: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
/**
 * A controller function to register a user in the database.
 */
declare const register: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
/**
 * A dummy controller function which sends a 200 OK status code. Should be used to close a request after a middleware call.
 */
declare const approve: (
  req: express.Request,
  res: express.Response,
) => Promise<void>;
/**
 * A controller function to verify an account with a verification token.
 */
declare const verifyAccount: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
/**
 * A controller function to send a password reset link to a user's email.
 */
declare const sendResetPasswordEmail: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
/**
 * A controller function to reset a user's password.
 */
declare const resetPassword: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const registerInvite: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
export {
  login,
  logout,
  register,
  approve,
  verifyAccount,
  sendResetPasswordEmail,
  resetPassword,
  registerInvite,
};
//# sourceMappingURL=auth.controller.d.ts.map
