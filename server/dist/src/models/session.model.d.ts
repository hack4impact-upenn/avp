/**
 * Defines the Session model for the database, which stores information
 * about user sessions, and also the interface to access the model in TypeScript.
 */
import mongoose from 'mongoose';
interface ISession extends mongoose.Document {
    _id: string;
    expires: Date;
    session: string;
}
declare const Session: mongoose.Model<ISession, {}, {}, {}, any>;
export default Session;
//# sourceMappingURL=session.model.d.ts.map