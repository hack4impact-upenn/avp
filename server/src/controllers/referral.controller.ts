/* eslint-disable import/prefer-default-export */
import express from 'express';
import ApiError from '../util/apiError';
import { createNewReferral, getAllDepartmentReferrals, getAllReferrals, getReferralById, updateReferralById } from '../services/referral.service';
import StatusCode from '../util/statusCode';

const createReferral = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
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
  } = req.body;

  if (
    isReferral === undefined ||
    !survivorName ||
    !serviceRequested ||
    !agencyThatReferred ||
    !agencyRepName ||
    !agencyRepEmail ||
    !agencyRepPhone ||
    !survivorPhoneNumber ||
    !relationshipToVictim ||
    !crimeType ||
    isGunViolence === undefined
  ) {
    next(
      ApiError.missingFields([
        'isReferral',
        'survivorName',
        'serviceRequested',
        'agencyThatReferred',
        'agencyRepName',
        'agencyRepEmail',
        'agencyRepPhone',
        'survivorPhoneNumber',
        'relationshipToVictim',
        'crimeType',
        'isGunViolence',
      ]),
    );
    return;
  }

  try {
    await createNewReferral(
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
    );
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to create referral due to the following error: ${err}`,
      ),
    );
  }
};

const getReferrals = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  try {
    const referrals = await getAllReferrals();
    res.status(StatusCode.OK).json(referrals);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to get all referrals due to the following error: ${err}`,
      ),
    );
  }
};

const getDepartmentReferrals = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  const { department } = req.params;

  try {
    const referrals = await getAllDepartmentReferrals(department);
    res.status(StatusCode.OK).json(referrals);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to get all referrals of the department due to the following error: ${err}`,
      ),
    );
  }
};

const getReferral = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  const { id } = req.params;

  try {
    const referrals = await getReferralById(id);
    res.status(StatusCode.OK).json(referrals);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to get referral by id due to the following error: ${err}`,
      ),
    );
  }
};

const updateReferral = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  const { id } = req.params;

  const {
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
  } = req.body;

  if (
    isReferral === undefined ||
    !survivorName ||
    !serviceRequested ||
    !agencyThatReferred ||
    !agencyRepName ||
    !agencyRepEmail ||
    !agencyRepPhone ||
    !survivorPhoneNumber ||
    !relationshipToVictim ||
    !crimeType ||
    isGunViolence === undefined
  ) {
    next(
      ApiError.missingFields([
        'isReferral',
        'survivorName',
        'serviceRequested',
        'agencyThatReferred',
        'agencyRepName',
        'agencyRepEmail',
        'agencyRepPhone',
        'survivorPhoneNumber',
        'relationshipToVictim',
        'crimeType',
        'isGunViolence',
      ]),
    );
    return;
  }

  try {
    const newReferral = await updateReferralById(
      id,
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
    );
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to update referral due to the following error: ${err}`,
      ),
    );
  }
};

export { createReferral, getReferrals, getDepartmentReferrals, getReferral, updateReferral };
