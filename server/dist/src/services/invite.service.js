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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeInviteByToken = exports.getInviteByToken = exports.getInviteByEmail = exports.updateInvite = exports.createInvite = void 0;
const invite_model_1 = require("../models/invite.model");
const removeSensitiveDataQuery = ['-verificationToken'];
/**
 * Creates a new invite in the database.
 * @param email - string representing the email of the invited user
 * @param verificationToken - string representing verification token
 * @returns The created {@link Invite}
 */
const createInvite = (email, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newInvite = new invite_model_1.Invite({
        email,
        verificationToken,
    });
    const invite = yield newInvite.save();
    return invite;
});
exports.createInvite = createInvite;
/**
 * Updates an existing invite in the database with a new verification token.
 * @param oldInvite {@link Invite} - string representing the email of the invited user
 * @param verificationToken - string representing verification token
 * @returns The created {@link Invite}
 */
const updateInvite = (oldInvite, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, email } = oldInvite;
    const newInvite = new invite_model_1.Invite({
        _id,
        email,
        verificationToken,
    });
    const invite = yield invite_model_1.Invite.findOneAndUpdate({ email }, newInvite).exec();
    return invite;
});
exports.updateInvite = updateInvite;
/**
 * Fetch the invite associtated with the given email
 * @param email - string representing the email of the invited user
 * @returns The invite {@link Invite}
 */
const getInviteByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const invite = yield invite_model_1.Invite.findOne({ email })
        .select(removeSensitiveDataQuery)
        .exec();
    return invite;
});
exports.getInviteByEmail = getInviteByEmail;
/**
 * Fetch the invite associtated with the given token
 * @param token - string representing the email of the invited user
 * @returns The invite {@link Invite}
 */
const getInviteByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const invite = yield invite_model_1.Invite.findOne({ verificationToken: token }).exec();
    return invite;
});
exports.getInviteByToken = getInviteByToken;
/**
 * Delete the invite associtated with the given token
 * @param token - string representing the email of the invited user
 * @returns The deleted invite {@link Invite}
 */
const removeInviteByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const invite = yield invite_model_1.Invite.findOneAndDelete({
        verificationToken: token,
    }).exec();
    return invite;
});
exports.removeInviteByToken = removeInviteByToken;
//# sourceMappingURL=invite.service.js.map