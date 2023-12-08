import {
  IReferral,
  addressItem,
  communicationItem,
  Referral,
  victimServicesOutcomeItem,
  counsellingServicesOutcomeItem,
  youthServicesOutcomeItem,
  fileObject,
} from '../models/referral.model';
import { IUser } from '../models/user.model';

const createNewReferral = async (
  staffName: string | undefined,
  status: string,
  departmentInCharge: string | undefined,
  program: string | undefined,
  staffAssigned: IUser | null | undefined,
  therapistAssigned: string | undefined,
  isReferral: boolean | null,
  survivorName: string,
  serviceRequested: string,
  agencyThatReferred: string,
  agencyRepName: string,
  agencyRepEmail: string,
  agencyRepPhone: string,
  survivorGender: string,
  survivorRace: string,
  survivorDOB: Date | null,
  survivorAge: number | undefined,
  survivorSchoolOrCommunitySite: string | undefined,
  survivorGrade: number | null | undefined,
  isGuardianResponsible: boolean | null | undefined,
  guardianName: string,
  guardianRelationship: string | undefined,
  guardianAddressObj: addressItem | undefined,
  guardianPhone: string,
  guardianEmail: string,
  guardianPreferredContactMethod: string,
  survivorEmailAddress: string,
  survivorAddressObj: addressItem | undefined,
  survivorPhoneNumber: string,
  survivorPreferredContactMethod: string,
  notesFromOrg: string,
  primaryLanguage: string,
  relationshipToVictim: string,
  crimeDCNum: string | undefined,
  crimeDistrict: string | undefined,
  crimeDate: Date | null,
  crimeType: string,
  isGunViolence: boolean | null,
  homDecedent: string,
  homDateOfDeath: Date | null,
  homType: string,
  homLocation: string | undefined,
  homAddressObj: addressItem | undefined,
  homZipCode: string | undefined,
  homDecedentAge: number | null | undefined,
  homDecedentSex: string | undefined,
  homDecedentRace: string | undefined,
  homDecedentEthnicity: string | undefined,
  homFMVNum: string | undefined,
  homMEONum: string | undefined,
  homMNum: string | undefined,
  homCaseInformation: string | undefined,
  historyOfCommunication: Array<communicationItem> | null | undefined,
  victimServicesOutcome: victimServicesOutcomeItem | null | undefined,
  counsellingServicesOutcome: counsellingServicesOutcomeItem | null | undefined,
  youthServicesOutcome: youthServicesOutcomeItem | null | undefined,
  outreachLetterSent: boolean | null | undefined,
  transferredToCCWaitlist: boolean | null | undefined,
  followUpLetterSent: boolean | null | undefined,
  transferredToETO: boolean | null | undefined,
  incidentAddressObj: addressItem | undefined,
  reportedToPolice: boolean | null,
  victimName: string | undefined,
  victimGender: string | undefined,
  date: Date | null,
): Promise<IReferral> => {
  const newReferral = new Referral({
    staffName,
    status,
    departmentInCharge,
    program,
    staffAssigned,
    therapistAssigned,
    isReferral,
    survivorName,
    serviceRequested,
    agencyThatReferred,
    agencyRepName,
    agencyRepEmail,
    agencyRepPhone,
    survivorGender,
    survivorRace,
    survivorDOB,
    survivorAge,
    survivorSchoolOrCommunitySite,
    survivorGrade,
    isGuardianResponsible,
    guardianName,
    guardianRelationship,
    guardianAddressObj,
    guardianPhone,
    guardianEmail,
    guardianPreferredContactMethod,
    survivorEmailAddress,
    survivorAddressObj,
    survivorPhoneNumber,
    survivorPreferredContactMethod,
    notesFromOrg,
    primaryLanguage,
    relationshipToVictim,
    crimeDCNum,
    crimeDistrict,
    crimeDate,
    crimeType,
    isGunViolence,
    homDecedent,
    homDateOfDeath,
    homType,
    homLocation,
    homAddressObj,
    homZipCode,
    homDecedentAge,
    homDecedentSex,
    homDecedentRace,
    homDecedentEthnicity,
    homFMVNum,
    homMEONum,
    homMNum,
    homCaseInformation,
    historyOfCommunication,
    victimServicesOutcome,
    counsellingServicesOutcome,
    youthServicesOutcome,
    outreachLetterSent,
    transferredToCCWaitlist,
    followUpLetterSent,
    transferredToETO,
    incidentAddressObj,
    reportedToPolice,
    victimName,
    victimGender,
    date,
  });
  const referral: IReferral = await newReferral.save();
  return referral;
};

const getAllReferrals = async () => {
  return Referral.find().exec();
};

const getAllDepartmentReferrals = async (department: string) => {
  return Referral.find({ departmentInCharge: department }).exec();
};

const getReferralById = async (id: string) => {
  return Referral.findOne({ _id: id }).exec();
};

const updateReferralById = async (
  id: string,
  staffName: string | undefined,
  status: string,
  departmentInCharge: string | undefined,
  program: string | undefined,
  staffAssigned: IUser | null | undefined,
  therapistAssigned: string | undefined,
  isReferral: boolean | null,
  survivorName: string,
  serviceRequested: string,
  agencyThatReferred: string,
  agencyRepName: string,
  agencyRepEmail: string,
  agencyRepPhone: string,
  survivorGender: string,
  survivorRace: string,
  survivorDOB: Date | null,
  survivorAge: number | undefined,
  survivorSchoolOrCommunitySite: string | undefined,
  survivorGrade: number | null | undefined,
  isGuardianResponsible: boolean | null | undefined,
  guardianName: string,
  guardianRelationship: string | undefined,
  guardianAddressObj: addressItem | undefined,
  guardianPhone: string,
  guardianEmail: string,
  guardianPreferredContactMethod: string,
  survivorEmailAddress: string,
  survivorAddressObj: addressItem | undefined,
  survivorPhoneNumber: string,
  survivorPreferredContactMethod: string,
  notesFromOrg: string,
  primaryLanguage: string,
  relationshipToVictim: string,
  crimeDCNum: string | undefined,
  crimeDistrict: string | undefined,
  crimeDate: Date | null,
  crimeType: string,
  isGunViolence: boolean | null,
  homDecedent: string,
  homDateOfDeath: Date | null,
  homType: string,
  homLocation: string | undefined,
  homAddressObj: addressItem | undefined,
  homZipCode: string | undefined,
  homDecedentAge: number | null | undefined,
  homDecedentSex: string | undefined,
  homDecedentRace: string | undefined,
  homDecedentEthnicity: string | undefined,
  homFMVNum: string | undefined,
  homMEONum: string | undefined,
  homMNum: string | undefined,
  homCaseInformation: string | undefined,
  historyOfCommunication: Array<communicationItem> | null | undefined,
  victimServicesOutcome: victimServicesOutcomeItem | null | undefined,
  counsellingServicesOutcome: counsellingServicesOutcomeItem | null | undefined,
  youthServicesOutcome: youthServicesOutcomeItem | null | undefined,
  outreachLetterSent: boolean | null | undefined,
  transferredToCCWaitlist: boolean | null | undefined,
  followUpLetterSent: boolean | null | undefined,
  transferredToETO: boolean | null | undefined,
  incidentAddressObj: addressItem | undefined,
  reportedToPolice: boolean | null,
  victimName: string | undefined,
  victimGender: string | undefined,
  date: Date | null,
) => {
  const updateQuery = {
    staffName,
    status,
    departmentInCharge,
    program,
    staffAssigned,
    therapistAssigned,
    isReferral,
    survivorName,
    serviceRequested,
    agencyThatReferred,
    agencyRepName,
    agencyRepEmail,
    agencyRepPhone,
    survivorGender,
    survivorRace,
    survivorDOB,
    survivorAge,
    survivorSchoolOrCommunitySite,
    survivorGrade,
    isGuardianResponsible,
    guardianName,
    guardianRelationship,
    guardianAddressObj,
    guardianPhone,
    guardianEmail,
    guardianPreferredContactMethod,
    survivorEmailAddress,
    survivorAddressObj,
    survivorPhoneNumber,
    survivorPreferredContactMethod,
    notesFromOrg,
    primaryLanguage,
    relationshipToVictim,
    crimeDCNum,
    crimeDistrict,
    crimeDate,
    crimeType,
    isGunViolence,
    homDecedent,
    homDateOfDeath,
    homType,
    homLocation,
    homAddressObj,
    homZipCode,
    homDecedentAge,
    homDecedentSex,
    homDecedentRace,
    homDecedentEthnicity,
    homFMVNum,
    homMEONum,
    homMNum,
    homCaseInformation,
    historyOfCommunication,
    victimServicesOutcome,
    counsellingServicesOutcome,
    youthServicesOutcome,
    outreachLetterSent,
    transferredToCCWaitlist,
    followUpLetterSent,
    transferredToETO,
    incidentAddressObj,
    reportedToPolice,
    victimName,
    victimGender,
    date,
  };
  const ret = await Referral.findByIdAndUpdate(id, updateQuery, {
    new: true,
  }).exec();
  // console.log(ret);

  return ret;
};

const addToCommunicationHistory = async (
  id: string,
  dateOfCommunication: Date,
  method: string,
  user: IUser,
  notes: string,
  didEstablishedContact: boolean,
  dateOfNextCommunication: Date,
) => {
  const newCommunicationItem: communicationItem = {
    dateOfCommunication,
    method,
    user,
    notes,
    didEstablishedContact,
    dateOfNextCommunication,
  };
  // if (!Referral.find({ historyOfCommunication: null }).exec())
  return Referral.findByIdAndUpdate(
    id,
    {
      $push: { historyOfCommunication: newCommunicationItem },
    },
    { new: true },
  ).exec();
};

const updateCommunicationHistory = async (
  id: string,
  index: string,
  dateOfCommunication: Date,
  method: string,
  user: IUser,
  notes: string,
  didEstablishedContact: boolean,
  dateOfNextCommunication: Date,
) => {
  const newCommunicationItem: communicationItem = {
    dateOfCommunication,
    method,
    user,
    notes,
    didEstablishedContact,
    dateOfNextCommunication,
  };
  return Referral.findByIdAndUpdate(
    id,
    {
      $set: {
        [`historyOfCommunication.${index}`]: newCommunicationItem,
      },
    },
    { new: true },
  ).exec();
};

const deleteCommunicationHistory = async (id: string, index: number) => {
  return Referral.findByIdAndUpdate(
    id,
    [
      {
        $set: {
          historyOfCommunication: {
            $concatArrays: [
              {
                $slice: ['$historyOfCommunication', index],
              },
              {
                $slice: [
                  '$historyOfCommunication',
                  index + 1,
                  {
                    $size: `$historyOfCommunication`,
                  },
                ],
              },
            ],
          },
        },
      },
    ],
    { new: true },
  ).exec();
};

const getDuplicateReferrals = async (phoneNumber: string, email: string) => {
  let phoneNumberRegex = '';
  if (phoneNumber.length) {
    for (let i = 0; i < phoneNumber.length; i += 1) {
      if (phoneNumber[i] >= '0' && phoneNumber[i] <= '9') {
        phoneNumberRegex += `${phoneNumber[i]}\\D*`;
      }
    }
    phoneNumberRegex += '$';
  }
  return Referral.find({
    $or: [
      { survivorEmailAddress: { $regex: email || '\\b\\B', $options: 'i' } },
      { survivorPhoneNumber: { $regex: phoneNumberRegex || '\\b\\B' } },
    ],
  });
};

const postVictimServicesOutcome = async (
  id: string,
  eligibleForAVPVictimServices: boolean,
  sentVCAPInfotoClient: boolean,
  avpAdvocateAssistingWithVCAP: boolean,
  referredToOtherVSAgencyForVCAP: boolean,
  vsAgencyName: string,
  avpAdvocateProvidingCourtSupport: boolean,
  clientWorkingWithFMV: boolean,
  fmvNumber: boolean,
  referredToOtherAgencyForCourt: boolean,
  courtSupportAgencyName: string,
  avpAdvocateContactedADA: boolean,
  avpAdvocateContactedDetective: boolean,
  needsRelocationAssistance: boolean,
  relocationReferralWasSubmitted: boolean,
  referredToAgencyForOtherServices: boolean,
  otherAgencyNames: string,
  otherServices: string,
  additionalNotes: string,
) => {
  const newVictimServicesOutcome: victimServicesOutcomeItem = {
    eligibleForAVPVictimServices,
    sentVCAPInfotoClient,
    avpAdvocateAssistingWithVCAP,
    referredToOtherVSAgencyForVCAP,
    vsAgencyName,
    avpAdvocateProvidingCourtSupport,
    clientWorkingWithFMV,
    fmvNumber,
    referredToOtherAgencyForCourt,
    courtSupportAgencyName,
    avpAdvocateContactedADA,
    avpAdvocateContactedDetective,
    needsRelocationAssistance,
    relocationReferralWasSubmitted,
    referredToAgencyForOtherServices,
    otherAgencyNames,
    otherServices,
    additionalNotes,
  };
  return Referral.findByIdAndUpdate(
    id,
    {
      victimServicesOutcome: newVictimServicesOutcome,
    },
    { new: true },
  ).exec();
};

const postCounsellingServicesOutcome = async (
  id: string,
  eligibleForAVPCounsellingServices: boolean,
  receivingCrisisCounselling: boolean,
  scheduledIntakeApptForIndividualTherapy: boolean,
  intakeAppointmentOutcome: boolean,
  receivingIndividualTherapy: boolean,
  therapistName: string,
  addedToIndividualTherapyWaitlist: boolean,
  referredForCounsellingServices: boolean,
  counsellingAgency: boolean,
  sentAVPSupportGroupInfo: boolean,
  attendingSupportGroup: boolean,
  supportGroupName: string,
  addedToSupportGroupWaitlist: boolean,
  additionalNotes: string,
) => {
  const newCounsellingServicesOutcome: counsellingServicesOutcomeItem = {
    eligibleForAVPCounsellingServices,
    receivingCrisisCounselling,
    scheduledIntakeApptForIndividualTherapy,
    intakeAppointmentOutcome,
    receivingIndividualTherapy,
    therapistName,
    addedToIndividualTherapyWaitlist,
    referredForCounsellingServices,
    counsellingAgency,
    sentAVPSupportGroupInfo,
    attendingSupportGroup,
    supportGroupName,
    addedToSupportGroupWaitlist,
    additionalNotes,
  };
  return Referral.findByIdAndUpdate(
    id,
    {
      counsellingServicesOutcome: newCounsellingServicesOutcome,
    },
    { new: true },
  ).exec();
};

const postYouthServicesOutcome = async (
  id: string,
  eligibleForYVOServices: boolean,
  assignedToYVOTherapist: boolean,
  yvoStaffName: string,
  addedToYVOIndividualTherapyWaitlist: boolean,
  assignedToYVOGroup: boolean,
  addedToYVOGroupWaitlist: boolean,
  additionalNotes: string,
) => {
  const newYouthServicesOutcome: youthServicesOutcomeItem = {
    eligibleForYVOServices,
    assignedToYVOTherapist,
    yvoStaffName,
    addedToYVOIndividualTherapyWaitlist,
    assignedToYVOGroup,
    addedToYVOGroupWaitlist,
    additionalNotes,
  };
  return Referral.findByIdAndUpdate(
    id,
    {
      youthServicesOutcome: newYouthServicesOutcome,
    },
    { new: true },
  ).exec();
};

const putVictimServicesOutcome = async (
  id: string,
  eligibleForAVPVictimServices: boolean,
  sentVCAPInfotoClient: boolean,
  avpAdvocateAssistingWithVCAP: boolean,
  referredToOtherVSAgencyForVCAP: boolean,
  vsAgencyName: string,
  avpAdvocateProvidingCourtSupport: boolean,
  clientWorkingWithFMV: boolean,
  fmvNumber: boolean,
  referredToOtherAgencyForCourt: boolean,
  courtSupportAgencyName: string,
  avpAdvocateContactedADA: boolean,
  avpAdvocateContactedDetective: boolean,
  needsRelocationAssistance: boolean,
  relocationReferralWasSubmitted: boolean,
  referredToAgencyForOtherServices: boolean,
  otherAgencyNames: string,
  otherServices: string,
  additionalNotes: string,
) => {
  const newVictimServicesOutcome: victimServicesOutcomeItem = {
    eligibleForAVPVictimServices,
    sentVCAPInfotoClient,
    avpAdvocateAssistingWithVCAP,
    referredToOtherVSAgencyForVCAP,
    vsAgencyName,
    avpAdvocateProvidingCourtSupport,
    clientWorkingWithFMV,
    fmvNumber,
    referredToOtherAgencyForCourt,
    courtSupportAgencyName,
    avpAdvocateContactedADA,
    avpAdvocateContactedDetective,
    needsRelocationAssistance,
    relocationReferralWasSubmitted,
    referredToAgencyForOtherServices,
    otherAgencyNames,
    otherServices,
    additionalNotes,
  };
  return Referral.findByIdAndUpdate(
    id,
    { victimServicesOutcome: newVictimServicesOutcome },
    { new: true }, // To return the updated document after the update
  ).exec();
};

const putCounsellingServicesOutcome = async (
  id: string,
  eligibleForAVPCounsellingServices: boolean,
  receivingCrisisCounselling: boolean,
  scheduledIntakeApptForIndividualTherapy: boolean,
  intakeAppointmentOutcome: boolean,
  receivingIndividualTherapy: boolean,
  therapistName: string,
  addedToIndividualTherapyWaitlist: boolean,
  referredForCounsellingServices: boolean,
  counsellingAgency: boolean,
  sentAVPSupportGroupInfo: boolean,
  attendingSupportGroup: boolean,
  supportGroupName: string,
  addedToSupportGroupWaitlist: boolean,
  additionalNotes: string,
) => {
  const newCounsellingServicesOutcome: counsellingServicesOutcomeItem = {
    eligibleForAVPCounsellingServices,
    receivingCrisisCounselling,
    scheduledIntakeApptForIndividualTherapy,
    intakeAppointmentOutcome,
    receivingIndividualTherapy,
    therapistName,
    addedToIndividualTherapyWaitlist,
    referredForCounsellingServices,
    counsellingAgency,
    sentAVPSupportGroupInfo,
    attendingSupportGroup,
    supportGroupName,
    addedToSupportGroupWaitlist,
    additionalNotes,
  };

  return Referral.findByIdAndUpdate(
    id,
    {
      $set: { counsellingServicesOutcome: newCounsellingServicesOutcome },
    },
    { new: true },
  ).exec();
};

const putYouthServicesOutcome = async (
  id: string,
  eligibleForYVOServices: boolean,
  assignedToYVOTherapist: boolean,
  yvoStaffName: string,
  addedToYVOIndividualTherapyWaitlist: boolean,
  assignedToYVOGroup: boolean,
  addedToYVOGroupWaitlist: boolean,
  additionalNotes: string,
) => {
  const newYouthServicesOutcome: youthServicesOutcomeItem = {
    eligibleForYVOServices,
    assignedToYVOTherapist,
    yvoStaffName,
    addedToYVOIndividualTherapyWaitlist,
    assignedToYVOGroup,
    addedToYVOGroupWaitlist,
    additionalNotes,
  };
  return Referral.findByIdAndUpdate(
    id,
    {
      $set: { youthServicesOutcome: newYouthServicesOutcome },
    },
    { new: true },
  ).exec();
};

const putReferralFileName = async (
  id: string,
  name: string,
  key: string,
  type: string,
) => {
  const updateItem: any = {};
  const newReferralFileName: fileObject = {
    name,
    key,
    type,
  };
  Object.entries(newReferralFileName).forEach(([k, value]) => {
    if (value !== undefined) {
      updateItem[`referralFile.${k}`] = value;
    }
  });

  await Referral.findByIdAndUpdate(id, {
    $set: {
      'referralFile.name': name,
      'referralFile.key': key,
      'referralFile.type': type,
    },
    new: true,
  });
};

const deleteReferralFileById = async (id: string) => {
  await Referral.findByIdAndUpdate(id, { $unset: { referralFile: 1 } });
};

const deleteFollowUpFileById = async (id: string) => {
  await Referral.findByIdAndUpdate(id, { $unset: { followUpLetterFile: 1 } });
};

const deleteOutreachFileById = async (id: string) => {
  await Referral.findByIdAndUpdate(id, { $unset: { outReachLetterFile: 1 } });
};

const putFollowUpFileName = async (
  id: string,
  name: string,
  key: string,
  type: string,
) => {
  const updateItem: any = {};
  const newFollowUpFileName: fileObject = {
    name,
    key,
    type,
  };
  Object.entries(newFollowUpFileName).forEach(([k, value]) => {
    if (value !== undefined) {
      updateItem[`followUpLetterFile.${k}`] = value;
    }
  });

  await Referral.findByIdAndUpdate(id, {
    $set: {
      'followUpLetterFile.name': name,
      'followUpLetterFile.key': key,
      'followUpLetterFile.type': type,
    },
    new: true,
  });
};

const putOutreachFileName = async (
  id: string,
  name: string,
  key: string,
  type: string,
) => {
  const updateItem: any = {};
  const newOutreachFileName: fileObject = {
    name,
    key,
    type,
  };
  Object.entries(newOutreachFileName).forEach(([k, value]) => {
    if (value !== undefined) {
      updateItem[`outReachLetterFile.${k}`] = value;
    }
  });

  await Referral.findByIdAndUpdate(id, {
    $set: {
      'outReachLetterFile.name': name,
      'outReachLetterFile.key': key,
      'outReachLetterFile.type': type,
    },
    new: true,
  });
};

export {
  createNewReferral,
  getAllReferrals,
  getAllDepartmentReferrals,
  getReferralById,
  updateReferralById,
  addToCommunicationHistory,
  updateCommunicationHistory,
  deleteCommunicationHistory,
  getDuplicateReferrals,
  postVictimServicesOutcome,
  postCounsellingServicesOutcome,
  postYouthServicesOutcome,
  putVictimServicesOutcome,
  putCounsellingServicesOutcome,
  putYouthServicesOutcome,
  putReferralFileName,
  putFollowUpFileName,
  putOutreachFileName,
  deleteReferralFileById,
  deleteFollowUpFileById,
  deleteOutreachFileById,
};
