/**
 * Interface for the referral data type return from the backend
 */

import mongoose from 'mongoose';
import IUser from './user';

interface communicationItem {
  dateOfCommunication: Date;
  method: string;
  user: IUser;
  notes?: string;
  didEstablishedContact: boolean;
  dateOfNextCommunication: Date;
}

interface IReferral extends mongoose.Document {
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
  historyOfCommunication: Array<communicationItem>;
  outreachLetterSent: boolean;
  transferredToCCWaitlist: boolean;
  followUpLetterSent: boolean;
  transferredToETO: boolean;
}

export default IReferral;
