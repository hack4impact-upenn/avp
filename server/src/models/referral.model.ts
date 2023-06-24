/**
 * Defines the Referral model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';
import { IUser, UserSchema } from './user.model';

interface communicationItem {
  dateOfCommunication: Date;
  method: string;
  user: IUser;
  notes?: string;
  didEstablishedContact: boolean;
  dateOfNextCommunication: Date;
}

interface victimServicesOutcomeItem {
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

interface counsellingServicesOutcomeItem {
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

interface youthServicesOutcomeItem {
  eligibleForYVOServices: boolean;
  assignedToYVOTherapist: boolean;
  yvoStaffName: string;
  addedToYVOIndividualTherapyWaitlist: boolean;
  assignedToYVOGroup: boolean;
  addedToYVOGroupWaitlist: boolean;
  additionalNotes: string;
}

const communicationItemSchema = new mongoose.Schema({
  dateOfCommunication: {
    type: Date,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  user: {
    type: UserSchema,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  didEstablishedContact: {
    type: Boolean,
    required: true,
  },
  dateOfNextCommunication: {
    type: Date,
    required: true,
  },
});

const VictimServicesOutcomeItemSchema = new mongoose.Schema({
  eligibleForAVPVictimServices: {
    type: Boolean,
    required: true,
  },
  sentVCAPInfotoClient: {
    type: Boolean,
    required: true,
  },
  avpAdvocateAssistingWithVCAP: {
    type: Boolean,
    required: true,
  },
  referredToOtherVSAgencyForVCAP: {
    type: Boolean,
    required: true,
  },
  vsAgencyName: {
    type: String,
    required: false,
  },
  avpAdvocateProvidingCourtSupport: {
    type: Boolean,
    required: true,
  },
  clientWorkingWithFMV: {
    type: Boolean,
    required: true,
  },
  fmvNumber: {
    type: Boolean,
    required: true,
  },
  referredToOtherAgencyForCourt: {
    type: Boolean,
    required: true,
  },
  courtSupportAgencyName: {
    type: String,
    required: false,
  },
  avpAdvocateContactedADA: {
    type: Boolean,
    required: true,
  },
  avpAdvocateContactedDetective: {
    type: Boolean,
    required: true,
  },
  needsRelocationAssistance: {
    type: Boolean,
    required: true,
  },
  relocationReferralWasSubmitted: {
    type: Boolean,
    required: true,
  },
  referredToAgencyForOtherServices: {
    type: Boolean,
    required: true,
  },
  otherAgencyNames: {
    type: String,
    required: false,
  },
  otherServices: {
    type: String,
    required: false,
  },
  additionalNotes: {
    type: String,
    required: false,
  },
});

const CounsellingServicesOutcomeItemSchema = new mongoose.Schema({
  eligibleForAVPCounsellingServices: {
    type: Boolean,
    required: true,
  },
  receivingCrisisCounselling: {
    type: Boolean,
    required: true,
  },
  scheduledIntakeApptForIndividualTherapy: {
    type: Boolean,
    required: true,
  },
  intakeAppointmentOutcome: {
    type: Boolean,
    required: true,
  },
  receivingIndividualTherapy: {
    type: Boolean,
    required: true,
  },
  therapistName: {
    type: String,
    required: false,
  },
  addedToIndividualTherapyWaitlist: {
    type: Boolean,
    required: true,
  },
  referredForCounsellingServices: {
    type: Boolean,
    required: true,
  },
  counsellingAgency: {
    type: Boolean,
    required: true,
  },
  sentAVPSupportGroupInfo: {
    type: Boolean,
    required: true,
  },
  attendingSupportGroup: {
    type: Boolean,
    required: true,
  },
  supportGroupName: {
    type: String,
    required: false,
  },
  addedToSupportGroupWaitlist: {
    type: Boolean,
    required: true,
  },
  additionalNotes: {
    type: String,
    required: false,
  },
});

const YouthServicesOutcomeItemSchema = new mongoose.Schema({
  eligibleForYVOServices: {
    type: Boolean,
    required: true,
  },
  assignedToYVOTherapist: {
    type: Boolean,
    required: true,
  },
  yvoStaffName: {
    type: String,
    required: false,
  },
  addedToYVOIndividualTherapyWaitlist: {
    type: Boolean,
    required: true,
  },
  assignedToYVOGroup: {
    type: Boolean,
    required: true,
  },
  addedToYVOGroupWaitlist: {
    type: Boolean,
    required: true,
  },
  additionalNotes: {
    type: String,
    required: false,
  },
});

const ReferralSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  departmentInCharge: {
    type: String,
    required: false,
  },
  program: {
    type: String,
    required: false,
  },
  staffAssigned: {
    type: UserSchema,
    required: false,
  },
  therapistAssigned: {
    type: String,
    required: false,
  },
  /* For developers: If this comes from Referral form, always set isReferral to True. */
  isReferral: {
    type: Boolean,
    required: true,
  },
  survivorName: {
    type: String,
    required: true,
  },
  serviceRequested: {
    type: String,
    required: true,
  },
  agencyThatReferred: {
    type: String,
    required: true,
  },
  agencyRepName: {
    type: String,
    required: true,
  },
  agencyRepEmail: {
    type: String,
    required: true,
  },
  agencyRepPhone: {
    type: String,
    required: true,
  },
  survivorGender: {
    type: String,
    required: false,
  },
  survivorRace: {
    type: String,
    required: false,
  },
  survivorDOB: {
    type: Date,
    required: false,
  },
  survivorAge: {
    type: Number,
    required: false,
  },
  survivorSchoolOrCommunitySite: {
    type: String,
    required: false,
  },
  survivorGrade: {
    type: Number,
    required: false,
  },
  isGuardianReponsible: {
    type: Boolean,
    required: false,
  },
  guardianName: {
    type: String,
    required: false,
  },
  guardianRelationship: {
    type: String,
    required: false,
  },
  guardianAddress: {
    type: String,
    required: false,
  },
  guardianPhone: {
    type: String,
    required: false,
  },
  guardianEmail: {
    type: String,
    required: false,
  },
  guardianPreferredContactMethod: {
    type: String,
    required: false,
  },
  survivorAddress: {
    type: String,
    required: false,
  },
  survivorEmailAddress: {
    type: String,
    required: true,
  },
  survivorPhoneNumber: {
    type: String,
    required: true,
  },
  survivorPreferredContactMethod: {
    type: String,
    required: true,
  },
  notesFromOrg: {
    type: String,
    required: false,
  },
  // How to store pdf ?
  primaryLanguage: {
    type: String,
    required: false,
  },
  relationshipToVictim: {
    type: String,
    required: true,
  },
  crimeDCNum: {
    type: String,
    required: false,
  },
  crimeDistrict: {
    type: String,
    required: false,
  },
  crimeDate: {
    type: Date,
    required: false,
  },
  crimeType: {
    type: String,
    required: true,
  },
  isGunViolence: {
    type: Boolean,
    required: true,
  },
  homDecedent: {
    type: String,
    required: false,
  },
  homDateOfDeath: {
    type: Date,
    required: false,
  },
  homCauseOfDeath: {
    type: String,
    required: false,
  },
  homType: {
    type: String,
    required: false,
  },
  homLocation: {
    type: String,
    required: false,
  },
  homAddress: {
    type: String,
    required: false,
  },
  homZipCode: {
    type: String,
    required: false,
  },
  homDecedentAge: {
    type: Number,
    required: false,
  },
  homDecedentSex: {
    type: String,
    required: false,
  },
  homDecedentRace: {
    type: String,
    required: false,
  },
  homDecedentEthnicity: {
    type: String,
    required: false,
  },
  homFMVNum: {
    type: String,
    required: false,
  },
  homMEONum: {
    type: String,
    required: false,
  },
  homMNum: {
    type: String,
    required: false,
  },
  homCaseInformation: {
    type: String,
    required: false,
  },
  historyOfCommunication: {
    type: [communicationItemSchema],
    required: false,
  },
  /* each department will have its own outcome object */
  victimServicesOutcome: {
    type: VictimServicesOutcomeItemSchema,
    required: false,
  },
  counsellingServicesOutcome: {
    type: CounsellingServicesOutcomeItemSchema,
    required: false,
  },
  youthServicesOutcome: {
    type: YouthServicesOutcomeItemSchema,
    required: false,
  },
  outreachLetterSent: {
    type: Boolean,
    required: true,
  },
  transferredToCCWaitlist: {
    type: Boolean,
    required: true,
  },
  followUpLetterSent: {
    type: Boolean,
    required: true,
  },
  transferredToETO: {
    type: Boolean,
    required: true,
  },
});

interface IReferral extends mongoose.Document {
  _id: string;
  timestamp: string;
  status: string;
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
  survivorEmailAddress: string;
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
  homDecedentSex: string;
  homDecedentRace: string;
  homDecedentEthnicity: string;
  homFMVNum: string;
  homMEONum: string;
  homeMNum: string;
  homCaseInformation: string;
  historyOfCommunication: Array<communicationItem>;
  victimServicesOutcome: victimServicesOutcomeItem;
  counsellingServicesOutcome: counsellingServicesOutcomeItem;
  youthServicesOutcome: youthServicesOutcomeItem;
  outreachLetterSent: boolean;
  transferredToCCWaitlist: boolean;
  followUpLetterSent: boolean;
  transferredToETO: boolean;
}

const Referral = mongoose.model<IReferral>('Referral', ReferralSchema);

export {
  IReferral,
  Referral,
  communicationItem,
  victimServicesOutcomeItem,
  counsellingServicesOutcomeItem,
  youthServicesOutcomeItem,
};
