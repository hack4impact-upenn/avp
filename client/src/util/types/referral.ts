/**
 * Interface for the referral data type return from the backend
 */

import mongoose from 'mongoose';
import IUser from './user';

interface ICommunicationItem {
  dateOfCommunication: Date;
  method: string;
  user: IUser;
  notes?: string;
  didEstablishedContact: boolean;
  dateOfNextCommunication: Date;
}

interface IVictimServicesOutcomeItem {
  eligibleForAVPVictimServices: boolean;
  sentVCAPInfotoClient: boolean;
  avpAdvocateAssistingWithVCAP: boolean;
  referredToOtherVSAgencyForVCAP: boolean;
  vsAgencyName: string;
  avpAdvocateProvidingCourtSupport: boolean;
  clientWorkingWithFMV: boolean;
  fmvNumber: boolean;
  referredToOtherAgencyForCourt: boolean;
  courtSupportAgencyName: string;
  avpAdvocateContactedADA: boolean;
  avpAdvocateContactedDetective: boolean;
  needsRelocationAssistance: boolean;
  relocationReferralWasSubmitted: boolean;
  referredToAgencyForOtherServices: boolean;
  otherAgencyNames: string;
  otherServices: string;
  additionalNotes: string;
}

interface ICounsellingServicesOutcomeItem {
  eligibleForAVPCounsellingServices: boolean;
  receivingCrisisCounselling: boolean;
  scheduledIntakeApptForIndividualTherapy: boolean;
  intakeAppointmentOutcome: boolean;
  receivingIndividualTherapy: boolean;
  therapistName: string;
  addedToIndividualTherapyWaitlist: boolean;
  referredForCounsellingServices: boolean;
  counsellingAgency: boolean;
  sentAVPSupportGroupInfo: boolean;
  attendingSupportGroup: boolean;
  supportGroupName: string;
  addedToSupportGroupWaitlist: boolean;
  additionalNotes: string;
}

interface IYouthServicesOutcomeItem {
  eligibleForYVOServices: boolean;
  assignedToYVOTherapist: boolean;
  yvoStaffName: string;
  addedToYVOIndividualTherapyWaitlist: boolean;
  assignedToYVOGroup: boolean;
  addedToYVOGroupWaitlist: boolean;
  additionalNotes: string;
}

export default interface IReferral extends mongoose.Document {
  staffName: string;
  _id: string;
  departmentInCharge: string;
  program: string;
  staffAssigned: IUser;
  therapistAssigned: string;
  isReferral: boolean;
  survivorName: string;
  serviceRequested: string;
  agencyThatReferred: string;
  agencyRepName: string;
  agencyRepEmail: string;
  agencyRepPhone: string;
  survivorGender: string;
  survivorRace: string;
  survivorDOB: Date;
  survivorAge: number;
  survivorSchoolOrCommunitySite: string;
  survivorGrade: number;
  isGuardianResponsible: boolean;
  guardianName: string;
  guardianRelationship: string;
  guardianAddress: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianPreferredContactMethod: string;
  survivorAddress: string;
  survivorPhoneNumber: string;
  survivorPreferredContactMethod: string;
  notesFromOrg: string;
  relationshipToVictim: string;
  crimeDCNum: string;
  crimeDistrict: string;
  crimeDate: Date;
  crimeType: string;
  isGunViolence: boolean;
  homDecedent: string;
  homDateOfDeath: Date;
  homType: string;
  homLocation: string;
  homAddress: string;
  homZipCode: string;
  homDecedentAge: number;
  homDecendentSex: string;
  homDecedentRace: string;
  homDecedentEthnicity: string;
  homFMVNum: string;
  homMEONum: string;
  homeMNum: string;
  homCaseInformation: string;
  historyOfCommunication: Array<ICommunicationItem>;
  outreachLetterSent: boolean;
  transferredToCCWaitlist: boolean;
  followUpLetterSent: boolean;
  transferredToETO: boolean;
}

export type {
  ICommunicationItem,
  IVictimServicesOutcomeItem,
  ICounsellingServicesOutcomeItem,
  IYouthServicesOutcomeItem,
  IReferral,
};
