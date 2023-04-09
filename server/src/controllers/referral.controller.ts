/* eslint-disable import/prefer-default-export */
import express from 'express';
import sgMail from '@sendgrid/mail';
import ApiError from '../util/apiError';
import {
  addToCommunicationHistory,
  createNewReferral,
  deleteCommunicationHistory,
  getAllDepartmentReferrals,
  getAllReferrals,
  getDuplicateReferrals,
  getReferralById,
  updateCommunicationHistory,
  updateReferralById,
} from '../services/referral.service';
import StatusCode from '../util/statusCode';
import { communicationItem } from '../models/referral.model';
import { IUser } from '../models/user.model';

// SendGrid setup
const apiKey: string = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(apiKey);

const setReferralStatus = async (
  staffAssigned: IUser,
  historyOfCommunication: Array<communicationItem>,
  outreachLetterSent: boolean,
  transferredToCCWaitlist: boolean,
  followUpLetterSent: boolean,
) => {
  let status = 'Unassigned';

  if (staffAssigned) {
    status = 'Assigned';
  }
  if (outreachLetterSent) {
    status = 'Outreach Letter Sent';
  }

  let establishedContact = false;
  for (let i = 0; i < historyOfCommunication.length; i += 1) {
    if (historyOfCommunication[i].didEstablishedContact) {
      establishedContact = true;
    }
  }

  if (establishedContact) {
    if (transferredToCCWaitlist) {
      status = 'CC Waitlist';
    } else {
      status = 'Completed';
    }
  } else if (
    historyOfCommunication.length === 1 &&
    !historyOfCommunication[0].didEstablishedContact
  ) {
    status = '1st unsuccessful attempt';
  } else if (
    historyOfCommunication.length === 2 &&
    !historyOfCommunication[1].didEstablishedContact
  ) {
    status = '2nd unsuccessful attempt';
  } else if (
    historyOfCommunication.length === 3 &&
    !historyOfCommunication[2].didEstablishedContact
  ) {
    status = '3rd unsuccessful attempt';
  }

  if (followUpLetterSent) {
    status = 'Follow-up letter sent';
  }

  return status;
};

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
  } = req.body;

  if (
    isReferral === undefined ||
    !survivorName ||
    !serviceRequested ||
    !agencyThatReferred ||
    !agencyRepName ||
    !agencyRepEmail ||
    !agencyRepPhone ||
    !survivorEmailAddress ||
    !survivorPhoneNumber ||
    !relationshipToVictim ||
    !crimeType ||
    !survivorPreferredContactMethod ||
    isGunViolence === undefined ||
    outreachLetterSent === undefined ||
    transferredToCCWaitlist === undefined ||
    followUpLetterSent === undefined ||
    transferredToETO === undefined
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
        'survivorEmailAddress',
        'survivorPhoneNumber',
        'relationshipToVictim',
        'crimeType',
        'survivorPreferredContactMethod',
        'isGunViolence',
        'outreachLetterSent',
        'transferredToCCWaitlist',
        'followUpLetterSent',
        'transferredToETO',
      ]),
    );
    return;
  }

  try {
    const status = await setReferralStatus(
      staffAssigned,
      historyOfCommunication,
      outreachLetterSent,
      transferredToCCWaitlist,
      followUpLetterSent,
    );
    await createNewReferral(
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
    );

    const nameArr = survivorName.split(' ');
    const survivorInitials = `${nameArr[0].charAt(0)}${nameArr[
      nameArr.length - 1
    ].charAt(0)}`;
    const msg = {
      to: `${agencyRepEmail}`,
      from: 'bach.tran@hack4impact.org',
      subject: `Referral for ${survivorInitials} to AVP for ${serviceRequested} - Confirmation`,
      html: `<div>Hi ${agencyRepName}, 
      <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>. The service that you requested was <strong>${serviceRequested}</strong>.</p>
      <p>We are sending this email to confirm the successful submission of a referral to AVP.</p>
      <p>You will receive a follow-up email when the referral is assigned to an AVP staff member.</p>
      Thank you,
      <br></br>
      Anti-Violence Partnership of Philadelphia
      <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
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
  } = req.body;

  if (
    isReferral === undefined ||
    !survivorName ||
    !serviceRequested ||
    !agencyThatReferred ||
    !agencyRepName ||
    !agencyRepEmail ||
    !agencyRepPhone ||
    !survivorEmailAddress ||
    !survivorPhoneNumber ||
    !relationshipToVictim ||
    !crimeType ||
    !survivorPreferredContactMethod ||
    isGunViolence === undefined ||
    outreachLetterSent === undefined ||
    transferredToCCWaitlist === undefined ||
    followUpLetterSent === undefined ||
    transferredToETO === undefined
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
        'survivorEmailAddress',
        'survivorPhoneNumber',
        'relationshipToVictim',
        'crimeType',
        'survivorPreferredContactMethod',
        'isGunViolence',
        'outreachLetterSent',
        'transferredToCCWaitlist',
        'followUpLetterSent',
        'transferredToETO',
      ]),
    );
    return;
  }

  try {
    const status = await setReferralStatus(
      staffAssigned,
      historyOfCommunication,
      outreachLetterSent,
      transferredToCCWaitlist,
      followUpLetterSent,
    );
    const prevReferral = await getReferralById(id);
    const referral = await updateReferralById(
      id,
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
    );

    const staffEmail = 'bach.tran@hack4impact.org';
    const staffFirstName = staffAssigned?.firstName || 'last name placeholder';
    const staffLastName = staffAssigned?.lastName || 'first name placeholder';
    const nameArr = survivorName.split(' ');
    const survivorInitials = `${nameArr[0].charAt(0)}${nameArr[
      nameArr.length - 1
    ].charAt(0)}`;
    if (status === 'Assigned' && !prevReferral?.staffAssigned) {
      const msg = {
        to: `${agencyRepEmail}`,
        from: 'bach.tran@hack4impact.org',
        subject: `Update for ${survivorInitials} to AVP for ${serviceRequested} - Assigned to ${staffFirstName} ${staffLastName}`,
        html: `<div>Hi ${agencyRepName}, 
        <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>, for the service <strong>${serviceRequested}</strong>.</p>
        <p>We are emailing to let you know that this referral was assigned to <strong>${staffFirstName} ${staffLastName}</strong>. Below is their contact information. You can reach them at <strong>${staffEmail}</strong></p>
        <p>If you have any questions please feel free to email the staff contact listed above.</p>
        Thank you,
        <br></br>
        Anti-Violence Partnership of Philadelphia
        <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
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
    } else if (status === 'Completed') {
      const msg = {
        to: `${agencyRepEmail}`,
        from: 'bach.tran@hack4impact.org',
        subject: `Update for ${survivorInitials} to AVP for ${serviceRequested} - Completed`,
        html: `<div>Hi ${agencyRepName}, 
        <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>, for the service <strong>${serviceRequested}</strong>.</p>
        <p>We are emailing to let you know that we established contact with <strong>${survivorName}</strong> and this referral has been marked as completed.</p>
        <p>If you have any questions please feel free to email the staff contact listed above.</p>
        Thank you,
        <br></br>
        Anti-Violence Partnership of Philadelphia
        <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
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
    }

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

  const {
    dateOfCommunication,
    method,
    user,
    notes,
    didEstablishedContact,
    dateOfNextCommunication,
  } = req.body;

  if (
    !dateOfCommunication ||
    !method ||
    !user ||
    !didEstablishedContact ||
    !dateOfNextCommunication
  ) {
    next(
      ApiError.missingFields([
        'dateOfCommunication',
        'method',
        'user',
        'didEstablishedContact',
        'dateOfNextCommunication',
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
      new Date(dateOfNextCommunication),
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

  const {
    dateOfCommunication,
    method,
    user,
    notes,
    didEstablishedContact,
    dateOfNextCommunication,
  } = req.body;

  if (
    !dateOfCommunication ||
    !method ||
    !user ||
    !didEstablishedContact ||
    !dateOfNextCommunication
  ) {
    next(
      ApiError.missingFields([
        'dateOfCommunication',
        'method',
        'user',
        'didEstablishedContact',
        'dateOfNextCommunication',
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
      dateOfNextCommunication,
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

const getDuplicates = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const phoneNumber = req.query.phoneNumber || '';
  const email = req.query.email || '';

  if (typeof phoneNumber !== 'string' || typeof email !== 'string') {
    next(ApiError.internal('Invalid query types'));
    return;
  }

  try {
    const referrals = await getDuplicateReferrals(phoneNumber, email);
    res.status(StatusCode.OK).json(referrals);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to get duplicate referrals due to the following error: ${err}`,
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
  getDuplicates,
};
