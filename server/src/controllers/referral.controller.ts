/* eslint-disable import/prefer-default-export */
import express from 'express';
import ApiError from '../util/apiError';
import {
  addToCommunicationHistory,
  createNewReferral,
  deleteCommunicationHistory,
  getAllDepartmentReferrals,
  getAllReferrals,
  getReferralById,
  updateCommunicationHistory,
  updateReferralById,
} from '../services/referral.service';
import StatusCode from '../util/statusCode';
//SendGrid setup
import sgMail from '@sendgrid/mail';
const apiKey: string = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(apiKey);

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
    survivorPreferredContactMethod,
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
    !survivorPreferredContactMethod ||
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
        'survivorPreferredContactMethod',
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
      survivorPreferredContactMethod,
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
    const msg = {
      to: `${agencyRepEmail}`,
      from: 'bach.tran@hack4impact.org',
      subject: `Referral for ${survivorName} to AVP for ${serviceRequested} - Confirmation`,
      html: `<div>Hi ${agencyRepName}, 
      <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>. The service that you requested was <strong>${serviceRequested}</strong>.</p>
      <p>We are sending this email to confirm the successful submission of a referral to AVP.</p>
      <p>You will receive a follow-up email when the referral is assigned to an AVP staff member.</p>
      Thank you,
      <br></br>
      Anti-Violence Partnership of Philadelphia
      </div>`,
    };

    sgMail
      .send(msg)
      .then((response: any) => {
        console.log(response);
        console.log('Email confirmation sent successfully');
      })
      .catch((error: any) => {
        next(
          ApiError.internal(
            `Unable to send referral confirmation email due to the following error: ${error}`,
          ),
        );
      });
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
    survivorPreferredContactMethod,
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
    !survivorPreferredContactMethod ||
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
        'survivorPreferredContactMethod',
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
      survivorPreferredContactMethod,
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

    const staffEmail = 'bach.tran@hack4impact.org';
    const msg = {
      to: `${agencyRepEmail}`,
      from: 'bach.tran@hack4impact.org',
      subject: `Update for ${survivorName} to AVP for ${serviceRequested} - Assigned to ${staffAssigned.firstName} ${staffAssigned.lastName}`,
      html: `<div>Hi ${agencyRepName}, 
      <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>, for the service <strong>${serviceRequested}</strong>.</p>
      <p>We are emailing to let you know that this referral was assigned to <strong>${staffAssigned.firstName} ${staffAssigned.lastName}</strong>. Below is their contact information. You can reach them at <strong>${staffEmail}</strong></p>
      <p>If you have any questions please feel free to email the staff contact listed above.</p>
      Thank you,
      <br></br>
      Anti-Violence Partnership of Philadelphia
      </div>`,
    };

    sgMail
      .send(msg)
      .then((response: any) => {
        console.log(response);
        console.log('Email confirmation sent successfully');
      })
      .catch((error: any) => {
        next(
          ApiError.internal(
            `Unable to send referral confirmation email due to the following error: ${error}`,
          ),
        );
      });
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
};

const addToHistory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;

  const { dateOfCommunication, method, user, notes, didEstablishedContact } =
    req.body;

  if (!dateOfCommunication || !method || !user || !didEstablishedContact) {
    next(
      ApiError.missingFields([
        'dateOfCommunication',
        'method',
        'user',
        'didEstablishedContact',
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
      didEstablishedContact,
    );
    res.status(StatusCode.OK).json(referral);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to add to communication history due to the following error: ${err}`,
      ),
    );
  }
};

const updateHistory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id, index } = req.params;

  const { dateOfCommunication, method, user, notes, didEstablishedContact } =
    req.body;

  if (!dateOfCommunication || !method || !user || !didEstablishedContact) {
    next(
      ApiError.missingFields([
        'dateOfCommunication',
        'method',
        'user',
        'didEstablishedContact',
      ]),
    );
    return;
  }

  try {
    const referral = await updateCommunicationHistory(
      id,
      index,
      dateOfCommunication,
      method,
      user,
      notes,
      didEstablishedContact,
    );
    res.status(StatusCode.OK).json(referral);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to update communication history due to the following error: ${err}`,
      ),
    );
  }
};

const deleteHistory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id, index } = req.params;

  try {
    const referral = await deleteCommunicationHistory(id, Number(index));
    res.status(StatusCode.OK).json(referral);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to delete communication history due to the following error: ${err}`,
      ),
    );
  }
};

export {
  createReferral,
  getReferrals,
  getDepartmentReferrals,
  getReferral,
  updateReferral,
  getCommunicationHistory,
  addToHistory,
  updateHistory,
  deleteHistory,
};
