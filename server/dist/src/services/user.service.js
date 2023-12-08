'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteUserById =
  exports.upgradeUserToAdmin =
  exports.getAllUsersFromDB =
  exports.getUserByResetPasswordToken =
  exports.getUserByEmailWithPassword =
  exports.getUserById =
  exports.getUserByVerificationToken =
  exports.getUserByEmail =
  exports.createUser =
  exports.passwordHashSaltRounds =
    void 0;
/**
 * All the functions for interacting with user data in the MongoDB database
 */
const bcrypt_1 = require('bcrypt');
const user_model_1 = require('../models/user.model');
const passwordHashSaltRounds = 10;
exports.passwordHashSaltRounds = passwordHashSaltRounds;
const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];
const removeSensitiveDataQueryKeepPassword = [
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];
/**
 * Creates a new user in the database.
 * @param firstName - string representing the first name of the user
 * @param lastName - string representing the last name of the user
 * @param email - string representing the email of the user
 * @param password - string representing the password of the user
 * @returns The created {@link User}
 */
const createUser = (firstName, lastName, email, password) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, bcrypt_1.hash)(
      password,
      passwordHashSaltRounds,
    );
    if (!hashedPassword) {
      return null;
    }
    const newUser = new user_model_1.User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      admin: false,
    });
    const user = yield newUser.save();
    return user;
  });
exports.createUser = createUser;
/**
 * Gets a user from the database by their email but doesn't include the
 * password in the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
const getUserByEmail = (email) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email })
      .select(removeSensitiveDataQuery)
      .exec();
    return user;
  });
exports.getUserByEmail = getUserByEmail;
/**
 * Gets a user from the database by their email and includes the password in
 * the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
const getUserByEmailWithPassword = (email) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email })
      .select(removeSensitiveDataQueryKeepPassword)
      .exec();
    return user;
  });
exports.getUserByEmailWithPassword = getUserByEmailWithPassword;
/**
 * Gets a user from the database by their verification token but doesn't include
 * the password in the returned user.
 * @param verificationToken The {@link string} representing the verification token
 * @returns The {@link User} or null if the user was not found.
 */
const getUserByVerificationToken = (verificationToken) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ verificationToken })
      .select(removeSensitiveDataQuery)
      .exec();
    return user;
  });
exports.getUserByVerificationToken = getUserByVerificationToken;
/**
 * Gets a user from the database by their id but doesn't include the
 * password in the returned user.
 * @param id The id of the user to get.
 * @returns The {@link User} or null if the user was not found.
 */
const getUserById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id)
      .select(removeSensitiveDataQuery)
      .exec();
    return user;
  });
exports.getUserById = getUserById;
/**
 * Gets a user from the database by their reset password token if the token
 * is not expired.
 * @param verificationToken The {@link string} representing the verification token
 * @returns The {@link User} or null if such a user was not found.
 */
const getUserByResetPasswordToken = (resetPasswordToken) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpiryDate: { $gt: Date.now() },
    }).exec();
    return user;
  });
exports.getUserByResetPasswordToken = getUserByResetPasswordToken;
/**
 * @returns All the {@link User}s in the database without their passwords.
 */
const getAllUsersFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield user_model_1.User.find({})
      .select(removeSensitiveDataQuery)
      .exec();
    return userList;
  });
exports.getAllUsersFromDB = getAllUsersFromDB;
/**
 * A function that upgrades a certain user to an admin.
 * @param id The id of the user to upgrade.
 * @returns The upgraded {@link User}
 */
const upgradeUserToAdmin = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(id, [
      { $set: { admin: { $eq: [false, '$admin'] } } },
    ]).exec();
    return user;
  });
exports.upgradeUserToAdmin = upgradeUserToAdmin;
/**
 * A function that deletes a user from the database.
 * @param id The id of the user to delete.
 * @returns The deleted {@link User}
 */
const deleteUserById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndDelete(id).exec();
    return user;
  });
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=user.service.js.map
