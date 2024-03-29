import express from 'express';
declare const uploadReferral: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const createReferral: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<express.Response<any, Record<string, any>>>;
declare const getReferrals: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getDepartmentReferrals: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getReferral: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const updateReferral: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getCommunicationHistory: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const addToHistory: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const updateHistory: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const deleteHistory: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getDuplicates: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getVictimServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const createVictimServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const updateVictimServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getCounsellingServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const createCounsellingServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const updateCounsellingServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getYouthServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const createYouthServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const updateYouthServicesOutcome: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const createRefferalPDF: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getReferralFile: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const deleteReferralFile: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const createFollowUpPDF: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getFollowUpFile: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const deleteFollowUpFile: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const createOutreachPDF: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const getOutreachFile: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
declare const deleteOutreachFile: (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>;
export {
  createReferral,
  getReferrals,
  getDepartmentReferrals,
  getReferral,
  updateReferral,
  getCommunicationHistory,
  addToHistory,
  updateHistory,
  deleteHistory,
  getDuplicates,
  getVictimServicesOutcome,
  createVictimServicesOutcome,
  updateVictimServicesOutcome,
  getCounsellingServicesOutcome,
  createCounsellingServicesOutcome,
  updateCounsellingServicesOutcome,
  getYouthServicesOutcome,
  createYouthServicesOutcome,
  updateYouthServicesOutcome,
  createRefferalPDF,
  getReferralFile,
  createFollowUpPDF,
  getFollowUpFile,
  createOutreachPDF,
  getOutreachFile,
  deleteReferralFile,
  deleteFollowUpFile,
  deleteOutreachFile,
  uploadReferral,
};
//# sourceMappingURL=referral.controller.d.ts.map
