/* eslint-disable import/prefer-default-export */
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
  isGuardianResponsible: boolean,
  guardianName: string,
  guardianRelationship: string,
  guardianAddress: string,
  guardianPhone: string,
  guardianEmail: string,
  guardianPreferredContactMethod: string,
  survivorAddress: string,
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
    isGuardianResponsible,
    guardianName,
    guardianRelationship,
    guardianAddress,
    guardianPhone,
    guardianEmail,
    guardianPreferredContactMethod,
    survivorAddress,
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
  });
  const referral: IReferral = await newReferral.save();
  return referral;
};

const getAllReferrals = async () => {
  return await Referral.find().exec();
};

const getAllDepartmentReferrals = async (department: string) => {
  return await Referral.find({ departmentInCharge: department }).exec();
};

const getReferralById = async (id: string) => {
  return await Referral.find({ _id: id }).exec();
};

export { createNewReferral, getAllReferrals, getAllDepartmentReferrals, getReferralById };