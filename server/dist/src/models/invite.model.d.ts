/**
 * Defines the Invite model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';
interface IInvite extends mongoose.Document {
    _id: string;
    email: string;
    verificationToken: string;
}
declare const Invite: mongoose.Model<IInvite, {}, {}, {}, any>;
export { IInvite, Invite };
//# sourceMappingURL=invite.model.d.ts.map