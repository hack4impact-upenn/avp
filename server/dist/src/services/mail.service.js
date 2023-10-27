"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailInviteLink = exports.emailResetPasswordLink = exports.emailVerificationLink = void 0;
/**
 * All the functions related to sending emails with SendGrid
 */
require("dotenv/config");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const appName = 'AVP Referrals Database'; // Replace with a relevant project name
const senderName = 'AVP'; // Replace with a relevant project sender
const baseUrl = 'https://avp-prod.vercel.app'; // TODO: figure out better place to put this
// eslint-disable-next-line no-useless-concat
mail_1.default.setApiKey(`${process.env.SENDGRID_API_KEY}`);
/**
 * Sends a reset password link to a user
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this reset attempt for the user
 */
const emailResetPasswordLink = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO DURING DEVELOPMENT: use a template to make this prettier and match client's style
    const resetLink = `${baseUrl}/reset-password/${token}`;
    const mailSettings = {
        from: {
            email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
            name: senderName,
        },
        to: email,
        subject: 'Link to Reset Password',
        html: `<p>You are receiving this because you (or someone else) have requested ` +
            `the reset of your account password for ${appName}. Please visit this ` +
            `<a href=${resetLink}>link</a> ` +
            `within an hour of receiving this email to successfully reset your password </p>` +
            `<p>If you did not request this change, please ignore this email and your ` +
            `account will remain secured.</p>`,
    };
    // Send the email and propogate the error up if one exists
    yield mail_1.default.send(mailSettings);
});
exports.emailResetPasswordLink = emailResetPasswordLink;
/**
 * Sends an email to verify an email account
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
const emailVerificationLink = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const resetLink = `${baseUrl}/verify-account/${token}`;
    const mailSettings = {
        from: {
            email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
            name: senderName,
        },
        to: email,
        subject: 'Verify account',
        html: `<p> Please visit the following ` +
            `<a href=${resetLink}>link</a> ` +
            `to verify your account for ${appName} and complete registration</p>` +
            `<p>If you did not attempt to register an account with this email address, ` +
            `please ignore this message.</p>`,
    };
    // Send the email and propogate the error up if one exists
    yield mail_1.default.send(mailSettings);
});
exports.emailVerificationLink = emailVerificationLink;
/**
 * Sends an email with an invite link to create an account
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
const emailInviteLink = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const resetLink = `${baseUrl}/invite/${token}`;
    const mailSettings = {
        from: {
            email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
            name: senderName,
        },
        to: email,
        subject: 'Verify account',
        html: `<p> Please visit the following ` +
            `<a href=${resetLink}>link</a> ` +
            `to create your account for ${appName} and complete registration</p>` +
            `<p>If you did not attempt to register an account with this email address, ` +
            `please ignore this message.</p>`,
    };
    // Send the email and propogate the error up if one exists
    yield mail_1.default.send(mailSettings);
});
exports.emailInviteLink = emailInviteLink;
//# sourceMappingURL=mail.service.js.map