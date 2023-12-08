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
exports.inviteUser =
  exports.verifyToken =
  exports.deleteUser =
  exports.upgradePrivilege =
  exports.getAllUsers =
    void 0;
const crypto_1 = __importDefault(require('crypto'));
const apiError_1 = __importDefault(require('../util/apiError'));
const statusCode_1 = __importDefault(require('../util/statusCode'));
const user_service_1 = require('../services/user.service');
const invite_service_1 = require('../services/invite.service');
const mail_service_1 = require('../services/mail.service');
/**
 * Get all users from the database. Upon success, send the a list of all users in the res body with 200 OK status code.
 */
const getAllUsers = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return (
      (0, user_service_1.getAllUsersFromDB)()
        .then((userList) => {
          res.status(statusCode_1.default.OK).send(userList);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((e) => {
          next(apiError_1.default.internal('Unable to retrieve all users'));
        })
    );
  });
exports.getAllUsers = getAllUsers;
/**
 * Upgrade a user to an admin. The email of the user is expected to be in the request body.
 * Upon success, return 200 OK status code.
 */
const upgradePrivilege = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
      next(apiError_1.default.missingFields(['email']));
      return;
    }
    const user = yield (0, user_service_1.getUserByEmail)(email);
    if (!user) {
      next(
        apiError_1.default.notFound(`User with email ${email} does not exist`),
      );
      return;
    }
    if (user.admin) {
      next(apiError_1.default.badRequest(`User is already an admin`));
      return;
    }
    (0, user_service_1.upgradeUserToAdmin)(user._id)
      .then(() => {
        res.sendStatus(statusCode_1.default.OK);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(apiError_1.default.internal('Unable to upgrade user to admin.'));
      });
  });
exports.upgradePrivilege = upgradePrivilege;
/**
 * Delete a user from the database. The email of the user is expected to be in the request parameter (url). Send a 200 OK status code on success.
 */
const deleteUser = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
      next(apiError_1.default.missingFields(['email']));
      return;
    }
    // Check if user to delete is an admin
    const user = yield (0, user_service_1.getUserByEmail)(email);
    if (!user) {
      next(
        apiError_1.default.notFound(`User with email ${email} does not exist`),
      );
      return;
    }
    const reqUser = req.user;
    if (reqUser.email === user.email) {
      next(apiError_1.default.badRequest('Cannot delete self.'));
      return;
    }
    if (user.admin) {
      next(apiError_1.default.forbidden('Cannot delete an admin.'));
      return;
    }
    (0, user_service_1.deleteUserById)(user._id)
      .then(() => res.sendStatus(statusCode_1.default.OK))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(apiError_1.default.internal('Failed to delete user.'));
      });
  });
exports.deleteUser = deleteUser;
const verifyToken = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    (0, invite_service_1.getInviteByToken)(token)
      .then((invite) => {
        if (invite) {
          res.status(statusCode_1.default.OK).send(invite);
        } else {
          next(apiError_1.default.notFound('Unable to retrieve invite'));
        }
      })
      .catch(() => {
        next(apiError_1.default.internal('Error retrieving invite'));
      });
  });
exports.verifyToken = verifyToken;
const inviteUser = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
    if (!email.match(emailRegex)) {
      next(apiError_1.default.badRequest('Invalid email'));
    }
    const lowercaseEmail = email.toLowerCase();
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
    const existingInvite = yield (0, invite_service_1.getInviteByEmail)(
      lowercaseEmail,
    );
    try {
      const verificationToken = crypto_1.default
        .randomBytes(32)
        .toString('hex');
      if (existingInvite) {
        yield (0, invite_service_1.updateInvite)(
          existingInvite,
          verificationToken,
        );
      } else {
        yield (0, invite_service_1.createInvite)(
          lowercaseEmail,
          verificationToken,
        );
      }
      yield (0,
      mail_service_1.emailInviteLink)(lowercaseEmail, verificationToken);
      res.sendStatus(statusCode_1.default.CREATED);
    } catch (err) {
      next(apiError_1.default.internal('Unable to invite user.'));
    }
  });
exports.inviteUser = inviteUser;
//# sourceMappingURL=admin.controller.js.map
