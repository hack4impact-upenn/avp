"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("../services/user.service");
/**
 * Middleware to check if a user is authenticated using the Local Strategy.
 * @param email Email of the user
 * @param password Password of the user
 * @param done Callback function to return
 */
const verifyLocalUser = (email, password, done) => {
    // Match user with email
    const lowercaseEmail = email.toLowerCase();
    (0, user_service_1.getUserByEmailWithPassword)(lowercaseEmail)
        .then((user) => {
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        // Match user with password
        return (0, bcrypt_1.compare)(password, user.password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                const cleanUser = user;
                delete cleanUser.password;
                return done(null, cleanUser);
            }
            return done(null, false, { message: 'Incorrect password.' });
        });
    })
        .catch((error) => {
        return done(error);
    });
};
/**
 * Initializes all the configurations for passport regarding strategies.
 * @param passport The passport instance to use.
 */
const initializePassport = (passport) => {
    // Set up middleware to use for each type of auth strategy
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email', // Treat email field in request as username
    }, verifyLocalUser));
    // Set up serialization and deserialization of user objects
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        (0, user_service_1.getUserById)(id)
            .then((user) => done(null, user))
            .catch((err) => done(err, null));
    });
};
exports.default = initializePassport;
//# sourceMappingURL=configPassport.js.map