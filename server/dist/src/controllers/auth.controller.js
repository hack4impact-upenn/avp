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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.registerInvite =
  exports.resetPassword =
  exports.sendResetPasswordEmail =
  exports.verifyAccount =
  exports.approve =
  exports.register =
  exports.logout =
  exports.login =
    void 0;
const passport_1 = __importDefault(require('passport'));
const crypto_1 = __importDefault(require('crypto'));
const bcrypt_1 = require('bcrypt');
const statusCode_1 = __importDefault(require('../util/statusCode'));
const user_service_1 = require('../services/user.service');
const mail_service_1 = require('../services/mail.service');
const apiError_1 = __importDefault(require('../util/apiError'));
const invite_service_1 = require('../services/invite.service');
/**
 * A controller function to login a user and create a session with Passport.
 * On success, the user's information is returned.
 * Else, send an appropriate error message.
 */
const login = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
      // next(ApiError.badRequest('Already logged in'));
      return;
    }
    // TODO: look more into when each of these errors are thrown
    passport_1.default.authenticate(
      ['local'],
      {
        failureMessage: true,
      },
      // Callback function defined by passport strategy in configPassport.ts
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err, user, info) => {
        if (err) {
          next(apiError_1.default.internal('Failed to authenticate user.'));
          return;
        }
        if (!user) {
          next(apiError_1.default.unauthorized('Incorrect credentials'));
          return;
        }
        if (!user.verified) {
          next(
            apiError_1.default.unauthorized('Need to verify account by email'),
          );
          return;
        }
        req.logIn(user, (error) => {
          if (error) {
            next(apiError_1.default.internal('Failed to log in user'));
            return;
          }
          res.status(statusCode_1.default.OK).send(user);
        });
      },
    )(req, res, next);
  });
exports.login = login;
/**
 * A controller function to logout a user with Passport and clear the session.
 */
const logout = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Logout with Passport which modifies the request object
    req.logout((err) => {
      if (err) {
        next(apiError_1.default.internal('Failed to log out user'));
        return;
      }
      // Destroy the session
      if (req.session) {
        req.session.destroy((e) => {
          if (e) {
            next(apiError_1.default.internal('Unable to logout properly'));
          } else {
            res.sendStatus(statusCode_1.default.OK);
          }
        });
      }
    });
  });
exports.logout = logout;
/**
 * A controller function to register a user in the database.
 */
const register = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      next(
        apiError_1.default.missingFields([
          'firstName',
          'lastName',
          'email',
          'password',
        ]),
      );
      return;
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
    const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/;
    const nameRegex = /^[a-z ,.'-]+/i;
    if (
      !email.match(emailRegex) ||
      !password.match(passwordRegex) ||
      !firstName.match(nameRegex) ||
      !lastName.match(nameRegex)
    ) {
      next(apiError_1.default.badRequest('Invalid email, password, or name.'));
      return;
    }
    if (req.isAuthenticated()) {
      next(apiError_1.default.badRequest('Already logged in.'));
      return;
    }
    const lowercaseEmail = email.toLowerCase();
    // Check if user exists
    const existingUser = yield (0, user_service_1.getUserByEmail)(
      lowercaseEmail,
    );
    if (existingUser) {
      next(
        apiError_1.default.badRequest(
          `An account with email ${lowercaseEmail} already exists.`,
        ),
      );
      return;
    }
    // Create user and send verification email
    try {
      const user = yield (0, user_service_1.createUser)(
        firstName,
        lastName,
        lowercaseEmail,
        password,
      );
      // Don't need verification email if testing
      if (process.env.NODE_ENV === 'test') {
        user.verified = true;
        yield user === null || user === void 0 ? void 0 : user.save();
      } else {
        const verificationToken = crypto_1.default
          .randomBytes(32)
          .toString('hex');
        user.verificationToken = verificationToken;
        yield user.save();
        yield (0, mail_service_1.emailVerificationLink)(
          lowercaseEmail,
          verificationToken,
        );
      }
      res.sendStatus(statusCode_1.default.CREATED);
    } catch (err) {
      next(apiError_1.default.internal('Unable to register user.'));
    }
  });
exports.register = register;
/**
 * A dummy controller function which sends a 200 OK status code. Should be used to close a request after a middleware call.
 */
const approve = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(statusCode_1.default.OK);
  });
exports.approve = approve;
/**
 * A controller function to verify an account with a verification token.
 */
const verifyAccount = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (!token) {
      next(apiError_1.default.missingFields(['token']));
      return;
    }
    const user = yield (0, user_service_1.getUserByVerificationToken)(token);
    if (!user) {
      next(apiError_1.default.badRequest('Invalid verification token.'));
      return;
    }
    user.verificationToken = undefined;
    user.verified = true;
    try {
      yield user.save();
      res.sendStatus(statusCode_1.default.OK);
    } catch (err) {
      next(apiError_1.default.internal('Unable to verify the account.'));
    }
  });
exports.verifyAccount = verifyAccount;
/**
 * A controller function to send a password reset link to a user's email.
 */
const sendResetPasswordEmail = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
      next(apiError_1.default.missingFields(['email']));
      return;
    }
    const lowercaseEmail = email.toLowerCase();
    const user = yield (0, user_service_1.getUserByEmail)(lowercaseEmail);
    if (!user) {
      next(
        apiError_1.default.notFound(
          `No user with email ${lowercaseEmail} is registered.`,
        ),
      );
      return;
    }
    // Generate a token for the user for this reset link
    const token = crypto_1.default.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiryDate = new Date(
      new Date().getTime() + 60 * 60 * 1000,
    ); // Expires in an hour
    yield user.save();
    // Send the email and return an appropriate response
    (0, mail_service_1.emailResetPasswordLink)(lowercaseEmail, token)
      .then(() =>
        res.status(statusCode_1.default.CREATED).send({
          message: `Reset link has been sent to ${lowercaseEmail}`,
        }),
      )
      .catch(() => {
        next(
          apiError_1.default.internal('Failed to email reset password link.'),
        );
      });
  });
exports.sendResetPasswordEmail = sendResetPasswordEmail;
/**
 * A controller function to reset a user's password.
 */
const resetPassword = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { password, token } = req.body;
    if (!password || !token) {
      next(apiError_1.default.missingFields(['password', 'token']));
      return;
    }
    const user = yield (0, user_service_1.getUserByResetPasswordToken)(token);
    if (!user) {
      next(apiError_1.default.badRequest('Invalid reset password token.'));
      return;
    }
    if (Date.now() > user.resetPasswordTokenExpiryDate.getTime()) {
      next(apiError_1.default.forbidden('Reset password token has expired.'));
      return;
    }
    // Hash the password before storing
    let hashedPassword;
    try {
      hashedPassword = yield (0, bcrypt_1.hash)(
        password,
        user_service_1.passwordHashSaltRounds,
      );
    } catch (err) {
      next(apiError_1.default.internal('Unable to reset the password'));
      return;
    }
    // Set new password for user
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiryDate = undefined;
    try {
      yield user.save();
      res.sendStatus(statusCode_1.default.OK);
    } catch (err) {
      next(apiError_1.default.internal('Unable to reset the password'));
    }
  });
exports.resetPassword = resetPassword;
const registerInvite = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, inviteToken } = req.body;
    if (!firstName || !lastName || !email || !password) {
      next(
        apiError_1.default.missingFields([
          'firstName',
          'lastName',
          'email',
          'password',
          'inviteToken',
        ]),
      );
      return;
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
    const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/;
    const nameRegex = /^[a-z ,.'-]+/i;
    if (
      !email.match(emailRegex) ||
      !password.match(passwordRegex) ||
      !firstName.match(nameRegex) ||
      !lastName.match(nameRegex)
    ) {
      next(apiError_1.default.badRequest('Invalid email, password, or name.'));
      return;
    }
    if (req.isAuthenticated()) {
      next(apiError_1.default.badRequest('Already logged in.'));
      return;
    }
    // Check if invite exists
    const invite = yield (0, invite_service_1.getInviteByToken)(inviteToken);
    if (!invite || invite.email !== email) {
      next(apiError_1.default.badRequest(`Invalid invite`));
      return;
    }
    const lowercaseEmail = email.toLowerCase();
    // Check if user exists
    const existingUser = yield (0, user_service_1.getUserByEmail)(
      lowercaseEmail,
    );
    if (existingUser) {
      next(
        apiError_1.default.badRequest(
          `An account with email ${lowercaseEmail} already exists.`,
        ),
      );
      return;
    }
    // Create user
    try {
      const user = yield (0, user_service_1.createUser)(
        firstName,
        lastName,
        lowercaseEmail,
        password,
      );
      user.verified = true;
      yield user === null || user === void 0 ? void 0 : user.save();
      yield (0, invite_service_1.removeInviteByToken)(inviteToken);
      res.sendStatus(statusCode_1.default.CREATED);
    } catch (err) {
      next(apiError_1.default.internal('Unable to register user.'));
    }
  });
exports.registerInvite = registerInvite;
//# sourceMappingURL=auth.controller.js.map
