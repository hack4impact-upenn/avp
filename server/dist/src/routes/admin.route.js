'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/**
 * Specifies the middleware and controller functions to call for each route
 * relating to admin users.
 */
const express_1 = __importDefault(require('express'));
const admin_middleware_1 = require('../controllers/admin.middleware');
const admin_controller_1 = require('../controllers/admin.controller');
const auth_middleware_1 = require('../controllers/auth.middleware');
const auth_controller_1 = require('../controllers/auth.controller');
require('dotenv/config');
const router = express_1.default.Router();
/**
 * A GET route to get all users. Checks first if the requestor is a
 * authenticated and is an admin.
 */
router.get(
  '/all',
  auth_middleware_1.isAuthenticated,
  admin_controller_1.getAllUsers,
);
/**
 * A GET route to check if the requestor is an admin. Checks first if the
 * requestor is a authenticated. Throws an error if the requestor is not an admin.
 */
router.get(
  '/adminstatus',
  auth_middleware_1.isAuthenticated,
  admin_middleware_1.isAdmin,
  auth_controller_1.approve,
);
/**
 * A PUT route to upgrade a user's privilege. Checks first if the requestor
 * is a authenticated and is an admin.
 * Expects a JSON body with the following fields:
 * - email (string) - The email of the user to be promoted
 */
router.put(
  '/promote',
  auth_middleware_1.isAuthenticated,
  admin_middleware_1.isAdmin,
  admin_controller_1.upgradePrivilege,
);
/**
 * A PUT route to upgrade a user's privilege
 * Expects a JSON body with the following fields:
 * - email (string) - The email of the user to be promoted
 */
// delete during deployment
router.put('/autopromote', admin_controller_1.upgradePrivilege);
/**
 * A PUT route to delete a user. Checks first if the requestor
 * is a authenticated and is an admin.
 * Expects the following fields in the URL:
 * email (string) - The email of the user to be deleted
 */
router.delete(
  '/:email',
  auth_middleware_1.isAuthenticated,
  admin_middleware_1.isAdmin,
  admin_controller_1.deleteUser,
);
/**
 * A POST route to invite a new user
 * Expects a JSON body with the following fields:
 * - email (string) - The email to invite the user from
 */
router.post(
  '/invite',
  auth_middleware_1.isAuthenticated,
  admin_middleware_1.isAdmin,
  admin_controller_1.inviteUser,
);
/**
 * A GET route to verify the user invite is valid
 */
router.get('/invite/:token', admin_controller_1.verifyToken);
exports.default = router;
//# sourceMappingURL=admin.route.js.map
