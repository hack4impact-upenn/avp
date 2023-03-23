import {
  IReferral,
  communicationItem,
  Referral,
} from '../models/referral.model';
import { IUser } from '../models/user.model';

const createNewReferral = async (
  departmentInCharge: string,
  program: string,
  staffAssigned: IUser,
  therapistAssigned: string,
  isReferral: boolean,
  survivorName: string,
  serviceRequested: string,
  agencyThatReferred: string,
  agencyRepName: string,
  agencyRepEmail: string,
  agencyRepPhone: string,
  survivorGender: string,
  survivorRace: string,
  survivorDOB: Date,
  survivorAge: number,
  survivorSchoolOrCommunitySite: string,
  survivorGrade: number,
  survivorPreferredContactMethod: string,
  isGuardianResponsible: boolean,
  guardianName: string,
  guardianRelationship: string,
  guardianAddress: string,
  guardianPhone: string,
  guardianEmail: string,
  guardianPreferredContactMethod: string,
  survivorAddress: string,
  survivorEmailAddress: string,
  survivorPhoneNumber: string,
  notesFromOrg: string,
  relationshipToVictim: string,
  crimeDCNum: string,
  crimeDistrict: string,
  crimeDate: Date,
  crimeType: string,
  isGunViolence: boolean,
  homDecedent: string,
  homDateOfDeath: Date,
  homType: string,
  homLocation: string,
  homAddress: string,
  homZipCode: string,
  homDecedentAge: number,
  homDecendentSex: string,
  homDecedentRace: string,
  homDecedentEthnicity: string,
  homFMVNum: string,
  homMEONum: string,
  homeMNum: string,
  historyOfCommunication: Array<communicationItem>,
  outreachLetterSent: boolean,
  transferredToCCWaitlist: boolean,
  followUpLetterSent: boolean,
  transferredToETO: boolean,
) => {
  const newReferral = new Referral({
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
    survivorPreferredContactMethod,
    isGuardianResponsible,
    guardianName,
    guardianRelationship,
    guardianAddress,
    guardianPhone,
    guardianEmail,
    guardianPreferredContactMethod,
    survivorAddress,
    survivorEmailAddress,
    survivorPhoneNumber,
    notesFromOrg,
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
    homAddress,
    homZipCode,
    homDecedentAge,
    homDecendentSex,
    homDecedentRace,
    homDecedentEthnicity,
    homFMVNum,
    homMEONum,
    homeMNum,
    historyOfCommunication,
    outreachLetterSent,
    transferredToCCWaitlist,
    followUpLetterSent,
    transferredToETO,
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
  departmentInCharge: string,
  program: string,
  staffAssigned: IUser,
  therapistAssigned: string,
  isReferral: boolean,
  survivorName: string,
  serviceRequested: string,
  agencyThatReferred: string,
  agencyRepName: string,
  agencyRepEmail: string,
  agencyRepPhone: string,
  survivorGender: string,
  survivorRace: string,
  survivorDOB: Date,
  survivorAge: number,
  survivorSchoolOrCommunitySite: string,
  survivorGrade: number,
  survivorPreferredContactMethod: string,
  isGuardianResponsible: boolean,
  guardianName: string,
  guardianRelationship: string,
  guardianAddress: string,
  guardianPhone: string,
  guardianEmail: string,
  guardianPreferredContactMethod: string,
  survivorAddress: string,
  survivorEmailAddress: string,
  survivorPhoneNumber: string,
  notesFromOrg: string,
  relationshipToVictim: string,
  crimeDCNum: string,
  crimeDistrict: string,
  crimeDate: Date,
  crimeType: string,
  isGunViolence: boolean,
  homDecedent: string,
  homDateOfDeath: Date,
  homType: string,
  homLocation: string,
  homAddress: string,
  homZipCode: string,
  homDecedentAge: number,
  homDecendentSex: string,
  homDecedentRace: string,
  homDecedentEthnicity: string,
  homFMVNum: string,
  homMEONum: string,
  homeMNum: string,
  historyOfCommunication: Array<communicationItem>,
  outreachLetterSent: boolean,
  transferredToCCWaitlist: boolean,
  followUpLetterSent: boolean,
  transferredToETO: boolean,
) => {
  const updateQuery = {
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
    survivorPreferredContactMethod,
    isGuardianResponsible,
    guardianName,
    guardianRelationship,
    guardianAddress,
    guardianPhone,
    guardianEmail,
    guardianPreferredContactMethod,
    survivorAddress,
    survivorEmailAddress,
    survivorPhoneNumber,
    notesFromOrg,
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
    homAddress,
    homZipCode,
    homDecedentAge,
    homDecendentSex,
    homDecedentRace,
    homDecedentEthnicity,
    homFMVNum,
    homMEONum,
    homeMNum,
    historyOfCommunication,
    outreachLetterSent,
    transferredToCCWaitlist,
    followUpLetterSent,
    transferredToETO,
  };
  return Referral.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
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
};
