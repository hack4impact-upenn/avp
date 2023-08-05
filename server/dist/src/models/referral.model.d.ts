/**
 * Defines the Referral model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';
import { IUser } from './user.model';
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
interface fileObject {
    name: string;
    key: string;
    type: string;
}
interface IReferral extends mongoose.Document {
    _id: string;
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
    survivorGrade: string;
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
    primaryLanguage: string;
    relationshipToVictim: string;
    crimeDCNum: string;
    crimeDistrict: string;
    crimeDate: Date | string;
    crimeType: string;
    isGunViolence: boolean;
    homDecedent: string;
    homDateOfDeath: Date | string;
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
    victimServicesOutcome: victimServicesOutcomeItem;
    counsellingServicesOutcome: counsellingServicesOutcomeItem;
    youthServicesOutcome: youthServicesOutcomeItem;
    outreachLetterSent: boolean;
    transferredToCCWaitlist: boolean;
    followUpLetterSent: boolean;
    transferredToETO: boolean;
    followUpLetterFile: fileObject;
    outReachLetterFile: fileObject;
    referralFile: fileObject;
    incidentAddress: string;
    incidentAddressZip: string;
    incidentAddressCity: string;
    incidentAddressState: string;
}
declare const Referral: mongoose.Model<IReferral, {}, {}, {}, any>;
export { IReferral, Referral, communicationItem, victimServicesOutcomeItem, counsellingServicesOutcomeItem, youthServicesOutcomeItem, fileObject, };
//# sourceMappingURL=referral.model.d.ts.map