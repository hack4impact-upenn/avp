declare const passwordHashSaltRounds = 10;
/**
 * Creates a new user in the database.
 * @param firstName - string representing the first name of the user
 * @param lastName - string representing the last name of the user
 * @param email - string representing the email of the user
 * @param password - string representing the password of the user
 * @returns The created {@link User}
 */
declare const createUser: (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => Promise<
  import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>
>;
/**
 * Gets a user from the database by their email but doesn't include the
 * password in the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
declare const getUserByEmail: (email: string) => Promise<
  import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>
>;
/**
 * Gets a user from the database by their email and includes the password in
 * the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
declare const getUserByEmailWithPassword: (email: string) => Promise<
  import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>
>;
/**
 * Gets a user from the database by their verification token but doesn't include
 * the password in the returned user.
 * @param verificationToken The {@link string} representing the verification token
 * @returns The {@link User} or null if the user was not found.
 */
declare const getUserByVerificationToken: (
  verificationToken: string,
) => Promise<
  import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>
>;
/**
 * Gets a user from the database by their id but doesn't include the
 * password in the returned user.
 * @param id The id of the user to get.
 * @returns The {@link User} or null if the user was not found.
 */
declare const getUserById: (id: string) => Promise<
  import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>
>;
/**
 * Gets a user from the database by their reset password token if the token
 * is not expired.
 * @param verificationToken The {@link string} representing the verification token
 * @returns The {@link User} or null if such a user was not found.
 */
declare const getUserByResetPasswordToken: (
  resetPasswordToken: string,
) => Promise<
  import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>
>;
/**
 * @returns All the {@link User}s in the database without their passwords.
 */
declare const getAllUsersFromDB: () => Promise<
  (import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>)[]
>;
/**
 * A function that upgrades a certain user to an admin.
 * @param id The id of the user to upgrade.
 * @returns The upgraded {@link User}
 */
declare const upgradeUserToAdmin: (id: string) => Promise<
  import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>
>;
/**
 * A function that deletes a user from the database.
 * @param id The id of the user to delete.
 * @returns The deleted {@link User}
 */
declare const deleteUserById: (id: string) => Promise<
  import('../models/user.model').IUser &
    Required<{
      _id: string;
    }>
>;
export {
  passwordHashSaltRounds,
  createUser,
  getUserByEmail,
  getUserByVerificationToken,
  getUserById,
  getUserByEmailWithPassword,
  getUserByResetPasswordToken,
  getAllUsersFromDB,
  upgradeUserToAdmin,
  deleteUserById,
};
//# sourceMappingURL=user.service.d.ts.map
