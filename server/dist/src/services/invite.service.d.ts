import { IInvite } from '../models/invite.model';
/**
 * Creates a new invite in the database.
 * @param email - string representing the email of the invited user
 * @param verificationToken - string representing verification token
 * @returns The created {@link Invite}
 */
declare const createInvite: (email: string, verificationToken: string) => Promise<IInvite & Required<{
    _id: string;
}>>;
/**
 * Updates an existing invite in the database with a new verification token.
 * @param oldInvite {@link Invite} - string representing the email of the invited user
 * @param verificationToken - string representing verification token
 * @returns The created {@link Invite}
 */
declare const updateInvite: (oldInvite: IInvite, verificationToken: string) => Promise<(IInvite & Required<{
    _id: string;
}>) | null>;
/**
 * Fetch the invite associtated with the given email
 * @param email - string representing the email of the invited user
 * @returns The invite {@link Invite}
 */
declare const getInviteByEmail: (email: string) => Promise<(IInvite & Required<{
    _id: string;
}>) | null>;
/**
 * Fetch the invite associtated with the given token
 * @param token - string representing the email of the invited user
 * @returns The invite {@link Invite}
 */
declare const getInviteByToken: (token: string) => Promise<(IInvite & Required<{
    _id: string;
}>) | null>;
/**
 * Delete the invite associtated with the given token
 * @param token - string representing the email of the invited user
 * @returns The deleted invite {@link Invite}
 */
declare const removeInviteByToken: (token: string) => Promise<(IInvite & Required<{
    _id: string;
}>) | null>;
export { createInvite, updateInvite, getInviteByEmail, getInviteByToken, removeInviteByToken, };
//# sourceMappingURL=invite.service.d.ts.map