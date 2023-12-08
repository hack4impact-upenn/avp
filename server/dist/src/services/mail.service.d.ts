/**
 * All the functions related to sending emails with SendGrid
 */
import 'dotenv/config';
/**
 * Sends a reset password link to a user
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this reset attempt for the user
 */
declare const emailResetPasswordLink: (
  email: string,
  token: string,
) => Promise<void>;
/**
 * Sends an email to verify an email account
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
declare const emailVerificationLink: (
  email: string,
  token: string,
) => Promise<void>;
/**
 * Sends an email with an invite link to create an account
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
declare const emailInviteLink: (email: string, token: string) => Promise<void>;
export { emailVerificationLink, emailResetPasswordLink, emailInviteLink };
//# sourceMappingURL=mail.service.d.ts.map
