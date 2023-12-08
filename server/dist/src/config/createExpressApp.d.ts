/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="cookie-parser" />
/// <reference types="express-session" />
/// <reference types="multer" />
import express from 'express';
import MongoStore from 'connect-mongo';
import 'dotenv/config';
/**
 * Creates an express instance with the appropriate routes and middleware
 * for the project.
 * @param sessionStore The {@link MongoStore} to use to store user sessions
 * @returns The configured {@link express.Express} instance
 */
declare const createExpressApp: (sessionStore: MongoStore) => express.Express;
export default createExpressApp;
//# sourceMappingURL=createExpressApp.d.ts.map
