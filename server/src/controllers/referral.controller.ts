/* eslint-disable import/prefer-default-export */
import express from 'express';
import ApiError from '../util/apiError';
import { addToCommunicationHistory, createNewReferral, deleteCommunicationHistory, getAllDepartmentReferrals, getAllReferrals, getReferralById, updateCommunicationHistory, updateReferralById } from '../services/referral.service';
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
    const referral = await getReferralById(id);
    res.status(StatusCode.OK).json(referral);
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
    const referral = await updateReferralById(
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
    res.status(StatusCode.OK).json(referral);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to update referral due to the following error: ${err}`,
      ),
    );
  }
};

const getCommunicationHistory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  const { id } = req.params;

  try {
    const referral = await getReferralById(id);
    res.status(StatusCode.OK).json(referral?.historyOfCommunication);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to get communication history due to the following error: ${err}`,
      ),
    );
  }
}

const addToHistory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  const { id } = req.params;

  const {
    dateOfCommunication,
    method,
    user,
    notes,
    didEstablishedContact,
  } = req.body;

  if (!dateOfCommunication || !method || !user || !didEstablishedContact) {
    next(ApiError.missingFields([
      'dateOfCommunication',
      'method',
      'user',
      'didEstablishedContact'
    ]),
    );
    return;
  }

  try {
    const referral = await addToCommunicationHistory(
      id,
      new Date(dateOfCommunication),
      method,
      user,
      notes,
      didEstablishedContact
    );
    res.status(StatusCode.OK).json(referral);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to add to communication history due to the following error: ${err}`,
      ),
    );
  }
}

const updateHistory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  const { id, history_index } = req.params;

  const {
    dateOfCommunication,
    method,
    user,
    notes,
    didEstablishedContact,
  } = req.body;

  if (!dateOfCommunication || !method || !user || !didEstablishedContact) {
    next(ApiError.missingFields([
      'dateOfCommunication',
      'method',
      'user',
      'didEstablishedContact'
    ]),
    );
    return;
  }

  try {
    const referral = await updateCommunicationHistory(
      id,
      history_index,
      dateOfCommunication,
      method,
      user,
      notes,
      didEstablishedContact
    );
    res.status(StatusCode.OK).json(referral);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to update communication history due to the following error: ${err}`,
      ),
    );
  }
}

const deleteHistory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  const { id, history_index } = req.params;

  try {
    const referral = await deleteCommunicationHistory(
      id,
      Number(history_index)
    );
    res.status(StatusCode.OK).json(referral);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to delete communication history due to the following error: ${err}`,
      ),
    );
  }
}

export { createReferral, getReferrals, getDepartmentReferrals, getReferral, updateReferral, getCommunicationHistory, addToHistory, updateHistory, deleteHistory };
