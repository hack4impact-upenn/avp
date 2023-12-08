export interface ReferralDB {
  _id: string;
  id?: string;
  status?: string;
  departmentInCharge?: string;
  program?: string;
  staffAssigned?: object;
  therapistAssigned?: string;
  isReferral?: boolean;
  survivorName?: string;
  serviceRequested?: string;
  agencyThatReferred?: string;
  agencyRepName?: string;
  agencyRepEmail?: string;
  agencyRepPhone?: string;
  survivorGender?: string;
  survivorRace?: string;
  survivorDOB?: Date;
  survivorAge?: number;
  survivorSchoolOrCommunitySite?: string;
  survivorGrade?: string;
  isGuardianResponsible?: boolean;
  guardianName?: string;
  guardianRelationship?: string;
  guardianAddressObj: object;
  guardianPhone?: string;
  guardianEmail?: string;
  guardianPreferredContactMethod?: string;
  survivorEmailAddress?: string;
  survivorAddressObj?: object;
  survivorPhoneNumber?: string;
  survivorPreferredContactMethod?: string;
  notesFromOrg?: string;
  primaryLanguage?: string;
  relationshipToVictim?: string;
  crimeDCNum?: string;
  crimeDistrict?: string;
  crimeDate?: Date | string;
  crimeType?: string;
  isGunViolence?: boolean;
  homDecedent?: string;
  homDateOfDeath?: Date | string;
  homType?: string;
  homLocation?: string;
  homAddressObj?: object;
  homZipCode?: string;
  homDecedentAge?: number;
  homDecedentSex?: string;
  homDecedentRace?: string;
  homDecedentEthnicity: string;
  homFMVNum: string;
  homMEONum?: string;
  homMNum?: string;
  homCaseInformation?: string;
  historyOfCommunication?: Array<object>;
  victimServicesOutcome?: object;
  counsellingServicesOutcome?: object;
  youthServicesOutcome?: object;
  outreachLetterSent?: boolean;
  transferredToCCWaitlist?: boolean;
  followUpLetterSent?: boolean;
  transferredToETO?: boolean;
  followUpLetterFile?: object;
  outReachLetterFile?: object;
  referralFile?: object;
  incidentAddressObj?: object;
  reportedToPolice?: boolean;
  victimName: string;
  victimGender: string;
  date: Date;
}

export const referralDbGrammar: ReferralDB = {
  _id: '', // string
  status: '', // string, optional
  departmentInCharge: '', // string, optional
  program: '', // string, optional
  staffAssigned: {}, // IUser, optional
  therapistAssigned: '', // string, optional
  isReferral: false, // boolean, optional
  survivorName: '', // string, optional
  serviceRequested: '', // string, optional
  agencyThatReferred: '', // string, optional
  agencyRepName: '', // string, optional
  agencyRepEmail: '', // string, optional
  agencyRepPhone: '', // string, optional
  survivorGender: '', // string, optional
  survivorRace: '', // string, optional
  survivorDOB: undefined, // Date, optional
  survivorAge: 0, // number, optional
  survivorSchoolOrCommunitySite: '', // string, optional
  survivorGrade: '', // string, optional
  isGuardianResponsible: false, // boolean, optional
  guardianName: '', // string, optional
  guardianRelationship: '', // string, optional
  guardianAddressObj: {}, // object
  guardianPhone: '', // string, optional
  guardianEmail: '', // string, optional
  guardianPreferredContactMethod: '', // string, optional
  survivorEmailAddress: '', // string, optional
  survivorAddressObj: {}, // object, optional
  survivorPhoneNumber: '', // string, optional
  survivorPreferredContactMethod: '', // string, optional
  notesFromOrg: '', // string, optional
  primaryLanguage: '', // string, optional
  relationshipToVictim: '', // string, optional
  crimeDCNum: '', // string, optional
  crimeDistrict: '', // string, optional
  crimeDate: undefined, // Date | string, optional
  crimeType: '', // string, optional
  isGunViolence: false, // boolean, optional
  homDecedent: '', // string, optional
  homDateOfDeath: undefined, // Date | string, optional
  homType: '', // string, optional
  homLocation: '', // string, optional
  homAddressObj: {}, // object, optional
  homZipCode: '', // string, optional
  homDecedentAge: 0, // number, optional
  homDecedentSex: '', // string, optional
  homDecedentRace: '', // string, optional
  homDecedentEthnicity: '', // string
  homFMVNum: '', // string
  homMEONum: '', // string, optional
  homMNum: '', // string, optional
  homCaseInformation: '', // string, optional
  historyOfCommunication: [], // Array<object>, optional
  victimServicesOutcome: {}, // object, optional
  counsellingServicesOutcome: {}, // object, optional
  youthServicesOutcome: {}, // object, optional
  outreachLetterSent: false, // boolean, optional
  transferredToCCWaitlist: false, // boolean, optional
  followUpLetterSent: false, // boolean, optional
  transferredToETO: false, // boolean, optional
  followUpLetterFile: {}, // object, optional
  outReachLetterFile: {}, // object, optional
  referralFile: {}, // object, optional
  incidentAddressObj: {}, // object, optional
  reportedToPolice: false, // boolean, optional
  victimName: '', // string
  victimGender: '', // string
  date: undefined, // Date
};
