/**
 * All the controller functions containing the logic for routes relating to
 * admin users such as getting all users, deleting users and upgrading users.
 */
import express from 'express';
/**
 * Get all users from the database. Upon success, send the a list of all users in the res body with 200 OK status code.
 */
declare const getAllUsers: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
/**
 * Upgrade a user to an admin. The email of the user is expected to be in the request body.
 * Upon success, return 200 OK status code.
 */
declare const upgradePrivilege: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
/**
 * Delete a user from the database. The email of the user is expected to be in the request parameter (url). Send a 200 OK status code on success.
 */
declare const deleteUser: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const verifyToken: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const inviteUser: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
export { getAllUsers, upgradePrivilege, deleteUser, verifyToken, inviteUser };
//# sourceMappingURL=admin.controller.d.ts.map
