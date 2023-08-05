import express from 'express';
/**
 * The final error handler for all errors encountered in the server. Responsible
 * for what is ultimately sent to the client, allowing the prevention of
 * sensitive server information leaking.
 * @param err The error propogated by a previous route handler. Could be an
 * {@link Error} or a custom {@link ApiError}
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction provided by Express
 */
declare const apiErrorResponder: (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => void;
export default apiErrorResponder;
//# sourceMappingURL=apiErrorResponder.d.ts.map