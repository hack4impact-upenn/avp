/**
 * Interface for the referral data type return from the backend
 */

import mongoose from 'mongoose';
import dayjs, { Dayjs } from 'dayjs';
import IUser from './user';

interface IAddressItem {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}
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

export default interface IReferral {
  id: string;
  _id: string;
  staffName: string;
  status: string;
  departmentInCharge: string;
  program: string;
  staffAssigned: IUser | null;
  therapistAssigned: string;
  isReferral: boolean | null;
  survivorName: string;
  serviceRequested: string;
  agencyThatReferred: string;
  agencyRepName: string;
  agencyRepEmail: string;
  agencyRepPhone: string;
  survivorGender: string;
  survivorRace: string;
  survivorDOB: Date | null;
  survivorAge: number | null;
  survivorSchoolOrCommunitySite: string;
  survivorGrade: string;
  isGuardianResponsible: boolean | null;
  guardianName: string;
  guardianRelationship: string;
  guardianAddressObj: IAddressItem;
  guardianPhone: string;
  guardianEmail: string;
  guardianPreferredContactMethod: string;
  survivorEmailAddress: string;
  survivorAddressObj: IAddressItem;
  survivorPhoneNumber: string;
  survivorPreferredContactMethod: string;
  notesFromOrg: string;
  primaryLanguage: string;
  relationshipToVictim: string;
  crimeDCNum: string;
  crimeDistrict: string;
  crimeDate: Date | null;
  crimeType: string;
  isGunViolence: boolean | null;
  homDecedent: string;
  homDateOfDeath: Date | null;
  homType: string;
  homLocation: string;
  homAddressObj: IAddressItem;
  homZipCode: string;
  homDecedentAge: number | null;
  homDecendentSex: string;
  homDecedentRace: string;
  homDecedentEthnicity: string;
  homFMVNum: string;
  homMEONum: string;
  homMNum: string;
  homCaseInformation: string;
  historyOfCommunication: Array<ICommunicationItem> | null;
  victimServicesOutcome: IVictimServicesOutcomeItem | null;
  counsellingServicesOutcome: ICounsellingServicesOutcomeItem | null;
  youthServicesOutcome: IYouthServicesOutcomeItem | null;
  outreachLetterSent: boolean | null;
  transferredToCCWaitlist: boolean | null;
  followUpLetterSent: boolean | null;
  transferredToETO: boolean | null;
  incidentAddressObj: IAddressItem;
  incidentAddressZip: string;
  incidentAddressCity: string;
  incidentAddressState: string;
  reportedToPolice: boolean | null;
  victimName: string;
  victimGender: string;
  date: Dayjs | null;

  // These fields are not in the database, but are used for the frontend
  // Page One
  serviceRequestedVictim: string;
  otherServiceRequestedVictim: string;
  // Page Three
  survivorGenderOther: string;
  survivorRaceOther: string;
  relationshipToVictimOther: string;
  guardianRelationshipOther: string;
}

export const emptyAddress = {street: '', city: '', state: '', zipcode: ''}

export const emptyReferral = {
  id: '',
  _id: '',
  staffName: '',
  status: '',
  departmentInCharge: '',
  program: '',
  staffAssigned: null,
  therapistAssigned: '',
  isReferral: true,
  survivorName: '',
  serviceRequested: '',
  agencyThatReferred: '',
  agencyRepName: '',
  agencyRepEmail: '',
  agencyRepPhone: '',
  survivorGender: '',
  survivorRace: '',
  survivorDOB: null,
  survivorAge: null,
  survivorSchoolOrCommunitySite: '',
  survivorGrade: '',
  isGuardianResponsible: null,
  guardianName: '',
  guardianRelationship: '',
  guardianAddressObj: emptyAddress,
  guardianPhone: '',
  guardianEmail: '',
  guardianPreferredContactMethod: '',
  survivorEmailAddress: '',
  survivorAddressObj: emptyAddress,
  survivorPhoneNumber: '',
  survivorPreferredContactMethod: '',
  notesFromOrg: '',
  primaryLanguage: '',
  relationshipToVictim: '',
  crimeDCNum: '',
  crimeDistrict: '',
  crimeDate: null,
  crimeType: '',
  isGunViolence: null,
  homDecedent: '',
  homDateOfDeath: null,
  homType: '',
  homLocation: '',
  homAddressObj: emptyAddress,
  homZipCode: '',
  homDecedentAge: null,
  homDecendentSex: '',
  homDecedentRace: '',
  homDecedentEthnicity: '',
  homFMVNum: '',
  homMEONum: '',
  homMNum: '',
  homCaseInformation: '',
  historyOfCommunication: null,
  victimServicesOutcome: null,
  counsellingServicesOutcome: null,
  youthServicesOutcome: null,
  outreachLetterSent: null,
  transferredToCCWaitlist: null,
  followUpLetterSent: null,
  transferredToETO: null,
  incidentAddressObj: emptyAddress,
  incidentAddressZip: '',
  incidentAddressCity: '',
  incidentAddressState: '',
  serviceRequestedVictim: '',
  otherServiceRequestedVictim: '',
  survivorGenderOther: '',
  survivorRaceOther: '',
  relationshipToVictimOther: '',
  guardianRelationshipOther: '',
  victimGender: '',
  reportedToPolice: null,
  preferredLanguage: '',
  victimName: '',
  date: dayjs(),
};

export type {
  ICommunicationItem,
  IVictimServicesOutcomeItem,
  ICounsellingServicesOutcomeItem,
  IYouthServicesOutcomeItem,
  IReferral,
};
