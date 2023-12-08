'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const path_1 = __importDefault(require('path'));
const passport_1 = __importDefault(require('passport'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const express_session_1 = __importDefault(require('express-session'));
const cors_1 = __importDefault(require('cors'));
const routers_1 = __importDefault(require('../routes/routers'));
const configPassport_1 = __importDefault(require('./configPassport'));
require('dotenv/config');
const apiErrorResponder_1 = __importDefault(
  require('../util/apiErrorResponder'),
);
const apiError_1 = __importDefault(require('../util/apiError'));
/**
 * Creates an express instance with the appropriate routes and middleware
 * for the project.
 * @param sessionStore The {@link MongoStore} to use to store user sessions
 * @returns The configured {@link express.Express} instance
 */
const createExpressApp = (sessionStore) => {
  const app = (0, express_1.default)();
  // Set up passport and strategies
  (0, configPassport_1.default)(passport_1.default);
  // UNCOMMENT FOR PROD
  app.set('port', process.env.PORT || 4000);
  // Sets the port for the app
  // Gives express the ability to parse requests with JSON and turn the JSON into objects
  app.use(express_1.default.json());
  // Gives express the ability to parse urlencoded payloads
  app.use(
    express_1.default.urlencoded({
      extended: true,
    }),
  );
  // Gives express the ability accept origins outside its own to accept requests from
  app.use(
    (0, cors_1.default)({
      credentials: true,
      origin: [
        'http://localhost:3000',
        'https://anti-violence-philadelphia.netlify.app',
        'https://avp-prod.vercel.app',
        'https://avpphila.vercel.app',
        'https://avp-h4i.vercel.app',
      ],
    }),
  );
  // Gives express the ability to parse client cookies and add them to req.cookies
  app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
  // Use express-session to maintain sessions
  app.use(
    (0, express_session_1.default)({
      secret: process.env.COOKIE_SECRET || 'SHOULD_DEFINE_COOKIE_SECRET',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    }),
  );
  // Init passport on every route call and allow it to use "express-session"
  app.use(passport_1.default.initialize());
  app.use(passport_1.default.session());
  // Inits routers listed in routers.ts file
  routers_1.default.forEach((entry) => app.use(entry.prefix, entry.router));
  // Serving static files
  if (process.env.NODE_ENV === 'production') {
    const root = path_1.default.join(
      __dirname,
      '../../../../',
      'client',
      'build',
    );
    app.use(express_1.default.static(root));
    app.get('*', (_, res) => {
      res.sendFile('index.html', { root });
    });
  }
  // Handles all non matched routes
  app.use((req, res, next) => {
    next(apiError_1.default.notFound('Endpoint unavailable'));
  });
  // Sets the error handler to use for all errors passed on by previous handlers
  app.use(apiErrorResponder_1.default);
  return app;
};
exports.default = createExpressApp;
//# sourceMappingURL=createExpressApp.js.map
