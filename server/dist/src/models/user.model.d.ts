/**
 * Defines the User model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';
declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firstName: string;
    lastName: string;
    password: string;
    verified: boolean;
    admin: boolean;
    email?: string | undefined;
    phone?: string | undefined;
    verificationToken?: string | undefined;
    resetPasswordToken?: string | undefined;
    resetPasswordTokenExpiryDate?: Date | undefined;
    department?: string | undefined;
}>;
interface IUser extends mongoose.Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    verified: boolean;
    verificationToken: string | null | undefined;
    resetPasswordToken: string | null | undefined;
    resetPasswordTokenExpiryDate: Date | null | undefined;
    admin: boolean;
    department: string;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, any>;
export { IUser, User, UserSchema };
//# sourceMappingURL=user.model.d.ts.map