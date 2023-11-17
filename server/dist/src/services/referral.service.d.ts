import { IReferral, communicationItem, victimServicesOutcomeItem, counsellingServicesOutcomeItem, youthServicesOutcomeItem } from '../models/referral.model';
import { IUser } from '../models/user.model';
declare const createNewReferral: (staffName: string | undefined, status: string, departmentInCharge: string | undefined, program: string | undefined, staffAssigned: IUser | null | undefined, therapistAssigned: string | undefined, isReferral: boolean | null, survivorName: string, serviceRequested: string, agencyThatReferred: string, agencyRepName: string, agencyRepEmail: string, agencyRepPhone: string, survivorGender: string, survivorRace: string, survivorDOB: Date | null, survivorAge: number | undefined, survivorSchoolOrCommunitySite: string | undefined, survivorGrade: number | null | undefined, isGuardianResponsible: boolean | null | undefined, guardianName: string, guardianRelationship: string | undefined, guardianAddress: string | undefined, guardianPhone: string, guardianEmail: string, guardianPreferredContactMethod: string, survivorEmailAddress: string, survivorAddress: string | undefined, survivorPhoneNumber: string, survivorPreferredContactMethod: string, notesFromOrg: string, primaryLanguage: string, relationshipToVictim: string, crimeDCNum: string | undefined, crimeDistrict: string | undefined, crimeDate: Date | null, crimeType: string, isGunViolence: boolean | null, homDecedent: string, homDateOfDeath: Date | null, homType: string, homLocation: string | undefined, homAddress: string | undefined, homZipCode: string | undefined, homDecedentAge: number | null | undefined, homDecendentSex: string | undefined, homDecedentRace: string | undefined, homDecedentEthnicity: string | undefined, homFMVNum: string | undefined, homMEONum: string | undefined, homMNum: string | undefined, homCaseInformation: string | undefined, historyOfCommunication: Array<communicationItem> | null | undefined, victimServicesOutcome: victimServicesOutcomeItem | null | undefined, counsellingServicesOutcome: counsellingServicesOutcomeItem | null | undefined, youthServicesOutcome: youthServicesOutcomeItem | null | undefined, outreachLetterSent: boolean | null | undefined, transferredToCCWaitlist: boolean | null | undefined, followUpLetterSent: boolean | null | undefined, transferredToETO: boolean | null | undefined, incidentAddress: string | undefined, incidentAddressZip: string | undefined, incidentAddressCity: string | undefined, incidentAddressState: string | undefined, reportedToPolice: boolean | null) => Promise<IReferral>;
declare const getAllReferrals: () => Promise<(IReferral & Required<{
    _id: string;
}>)[]>;
declare const getAllDepartmentReferrals: (department: string) => Promise<(IReferral & Required<{
    _id: string;
}>)[]>;
declare const getReferralById: (id: string) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const updateReferralById: (id: string, status: string, departmentInCharge: string, program: string, staffAssigned: IUser, therapistAssigned: string, isReferral: boolean, survivorName: string, serviceRequested: string, agencyThatReferred: string, agencyRepName: string, agencyRepEmail: string, agencyRepPhone: string, survivorGender: string, survivorRace: string, survivorDOB: Date, survivorAge: number, survivorSchoolOrCommunitySite: string, survivorGrade: number, survivorPreferredContactMethod: string, isGuardianResponsible: boolean, guardianName: string, guardianRelationship: string, guardianAddress: string, guardianPhone: string, guardianEmail: string, guardianPreferredContactMethod: string, survivorAddress: string, survivorEmailAddress: string, survivorPhoneNumber: string, notesFromOrg: string, primaryLanguage: string, relationshipToVictim: string, crimeDCNum: string, crimeDistrict: string, crimeDate: Date, crimeType: string, isGunViolence: boolean, homDecedent: string, homDateOfDeath: Date, homType: string, homLocation: string, homAddress: string, homZipCode: string, homDecedentAge: number, homDecendentSex: string, homDecedentRace: string, homDecedentEthnicity: string, homFMVNum: string, homMEONum: string, homMNum: string, homCaseInformation: string, historyOfCommunication: Array<communicationItem>, outreachLetterSent: boolean, transferredToCCWaitlist: boolean, followUpLetterSent: boolean, transferredToETO: boolean, victimServicesOutcome: victimServicesOutcomeItem, counsellingServicesOutcome: counsellingServicesOutcomeItem, youthServicesOutcome: youthServicesOutcomeItem, reportedToPolice: boolean) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const addToCommunicationHistory: (id: string, dateOfCommunication: Date, method: string, user: IUser, notes: string, didEstablishedContact: boolean, dateOfNextCommunication: Date) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const updateCommunicationHistory: (id: string, index: string, dateOfCommunication: Date, method: string, user: IUser, notes: string, didEstablishedContact: boolean, dateOfNextCommunication: Date) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const deleteCommunicationHistory: (id: string, index: number) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const getDuplicateReferrals: (phoneNumber: string, email: string) => Promise<(IReferral & Required<{
    _id: string;
}>)[]>;
declare const postVictimServicesOutcome: (id: string, eligibleForAVPVictimServices: boolean, sentVCAPInfotoClient: boolean, avpAdvocateAssistingWithVCAP: boolean, referredToOtherVSAgencyForVCAP: boolean, vsAgencyName: string, avpAdvocateProvidingCourtSupport: boolean, clientWorkingWithFMV: boolean, fmvNumber: boolean, referredToOtherAgencyForCourt: boolean, courtSupportAgencyName: string, avpAdvocateContactedADA: boolean, avpAdvocateContactedDetective: boolean, needsRelocationAssistance: boolean, relocationReferralWasSubmitted: boolean, referredToAgencyForOtherServices: boolean, otherAgencyNames: string, otherServices: string, additionalNotes: string) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const postCounsellingServicesOutcome: (id: string, eligibleForAVPCounsellingServices: boolean, receivingCrisisCounselling: boolean, scheduledIntakeApptForIndividualTherapy: boolean, intakeAppointmentOutcome: boolean, receivingIndividualTherapy: boolean, therapistName: string, addedToIndividualTherapyWaitlist: boolean, referredForCounsellingServices: boolean, counsellingAgency: boolean, sentAVPSupportGroupInfo: boolean, attendingSupportGroup: boolean, supportGroupName: string, addedToSupportGroupWaitlist: boolean, additionalNotes: string) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const postYouthServicesOutcome: (id: string, eligibleForYVOServices: boolean, assignedToYVOTherapist: boolean, yvoStaffName: string, addedToYVOIndividualTherapyWaitlist: boolean, assignedToYVOGroup: boolean, addedToYVOGroupWaitlist: boolean, additionalNotes: string) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const putVictimServicesOutcome: (id: string, eligibleForAVPVictimServices: boolean, sentVCAPInfotoClient: boolean, avpAdvocateAssistingWithVCAP: boolean, referredToOtherVSAgencyForVCAP: boolean, vsAgencyName: string, avpAdvocateProvidingCourtSupport: boolean, clientWorkingWithFMV: boolean, fmvNumber: boolean, referredToOtherAgencyForCourt: boolean, courtSupportAgencyName: string, avpAdvocateContactedADA: boolean, avpAdvocateContactedDetective: boolean, needsRelocationAssistance: boolean, relocationReferralWasSubmitted: boolean, referredToAgencyForOtherServices: boolean, otherAgencyNames: string, otherServices: string, additionalNotes: string) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const putCounsellingServicesOutcome: (id: string, eligibleForAVPCounsellingServices: boolean, receivingCrisisCounselling: boolean, scheduledIntakeApptForIndividualTherapy: boolean, intakeAppointmentOutcome: boolean, receivingIndividualTherapy: boolean, therapistName: string, addedToIndividualTherapyWaitlist: boolean, referredForCounsellingServices: boolean, counsellingAgency: boolean, sentAVPSupportGroupInfo: boolean, attendingSupportGroup: boolean, supportGroupName: string, addedToSupportGroupWaitlist: boolean, additionalNotes: string) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const putYouthServicesOutcome: (id: string, eligibleForYVOServices: boolean, assignedToYVOTherapist: boolean, yvoStaffName: string, addedToYVOIndividualTherapyWaitlist: boolean, assignedToYVOGroup: boolean, addedToYVOGroupWaitlist: boolean, additionalNotes: string) => Promise<IReferral & Required<{
    _id: string;
}>>;
declare const putReferralFileName: (id: string, name: string, key: string, type: string) => Promise<void>;
declare const deleteReferralFileById: (id: string) => Promise<void>;
declare const deleteFollowUpFileById: (id: string) => Promise<void>;
declare const deleteOutreachFileById: (id: string) => Promise<void>;
declare const putFollowUpFileName: (id: string, name: string, key: string, type: string) => Promise<void>;
declare const putOutreachFileName: (id: string, name: string, key: string, type: string) => Promise<void>;
export { createNewReferral, getAllReferrals, getAllDepartmentReferrals, getReferralById, updateReferralById, addToCommunicationHistory, updateCommunicationHistory, deleteCommunicationHistory, getDuplicateReferrals, postVictimServicesOutcome, postCounsellingServicesOutcome, postYouthServicesOutcome, putVictimServicesOutcome, putCounsellingServicesOutcome, putYouthServicesOutcome, putReferralFileName, putFollowUpFileName, putOutreachFileName, deleteReferralFileById, deleteFollowUpFileById, deleteOutreachFileById, };
//# sourceMappingURL=referral.service.d.ts.map