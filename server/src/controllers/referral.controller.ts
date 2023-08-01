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
  postVictimServicesOutcome,
  postCounsellingServicesOutcome,
  postYouthServicesOutcome,
  putVictimServicesOutcome,
  putCounsellingServicesOutcome,
  putYouthServicesOutcome,
} from '../services/referral.service';
import StatusCode from '../util/statusCode';
import {
  communicationItem,
  youthServicesOutcomeItem,
} from '../models/referral.model';
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
  if (historyOfCommunication) {
    for (let i = 0; i < historyOfCommunication.length; i += 1) {
      if (historyOfCommunication[i].didEstablishedContact) {
        establishedContact = true;
      }
    }
  }


  if (establishedContact) {
    if (transferredToCCWaitlist) {
      status = 'CC Waitlist';
    } else {
      status = 'Completed';
    }
  } else if (
    historyOfCommunication?.length === 1 &&
    !historyOfCommunication[0]?.didEstablishedContact
  ) {
    status = '1st unsuccessful attempt';
  } else if (
    historyOfCommunication?.length === 2 &&
    !historyOfCommunication[1]?.didEstablishedContact
  ) {
    status = '2nd unsuccessful attempt';
  } else if (
    historyOfCommunication?.length === 3 &&
    !historyOfCommunication[2]?.didEstablishedContact
  ) {
    status = '3rd unsuccessful attempt';
  }

  if (followUpLetterSent) {
    status = 'Follow-up letter sent';
  }

  return status;
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^\+?1?\s*\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
  return phoneRegex.test(phoneNumber);
}

const createReferral = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log('HIT ENDPOINT - CREATE REFFERRAL')
  var {
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
    guardianAddress,
    guardianPhone,
    guardianEmail,
    guardianPreferredContactMethod,
    survivorEmailAddress,
    survivorAddress,
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
    homAddress,
    homZipCode,
    homDecedentAge,
    homDecendentSex,
    homDecedentRace,
    homDecedentEthnicity,
    homFMVNum,
    homMEONum,
    homeMNum,
    homCaseInformation,
    historyOfCommunication,
    victimServicesOutcome,
    counsellingServicesOutcome,
    youthServicesOutcome,
    outreachLetterSent,
    transferredToCCWaitlist,
    followUpLetterSent,
    transferredToETO,
    incidentAddress,
    incidentAddressZip,
    incidentAddressCity,
    incidentAddressState,
    serviceRequestedVictim,
    otherServiceRequestedVictim,
  } = req.body;
  if (serviceRequestedVictim) {
    serviceRequested = serviceRequested + ", " + serviceRequestedVictim
  }
  if (otherServiceRequestedVictim) {
    serviceRequested = serviceRequested + ", " + otherServiceRequestedVictim
  }
  if (outreachLetterSent == undefined) outreachLetterSent = false;
  if (transferredToCCWaitlist == undefined) transferredToCCWaitlist = false;
  if (followUpLetterSent == undefined) followUpLetterSent = false;
  if (transferredToETO == undefined) transferredToETO = false;
  if (isReferral == undefined) isReferral = false;


  const missingFields = [];
  // if (isGuardianResponsible == undefined) missingFields.push('isGuardianResponsible');
  if (isGuardianResponsible) {
    if (!guardianName) missingFields.push('guardianName'); 
    if (!guardianRelationship) missingFields.push('guardianRelationship');
    if (!guardianAddress) missingFields.push('guardianAddress')
    ; 
    if (!guardianPhone) {missingFields.push('guardianPhone');}
    else if(!survivorPhoneNumber || !isValidPhoneNumber(survivorPhoneNumber)) {survivorPhoneNumber = guardianPhone;}

    if (!guardianEmail || !isValidEmail(guardianEmail)) {missingFields.push('guardianEmail');}
    else if(!survivorEmailAddress || !isValidEmail(survivorEmailAddress)) {survivorEmailAddress = guardianEmail;}

    if (!guardianPreferredContactMethod) missingFields.push('guardianPreferredContactMethod');
    else if (!survivorPreferredContactMethod) survivorPreferredContactMethod = guardianPreferredContactMethod;
  } 
  if (isReferral === undefined) missingFields.push('isReferral');
  if (!survivorName) missingFields.push('survivorName');
  if (!serviceRequested) missingFields.push('serviceRequested');
  if (!agencyThatReferred) missingFields.push('agencyThatReferred');
  if (!agencyRepName) missingFields.push('agencyRepName');
  if (!agencyRepEmail || !isValidEmail(agencyRepEmail)) missingFields.push('agencyRepEmail');
  if (!agencyRepPhone) missingFields.push('agencyRepPhone');
  if (!survivorEmailAddress || !isValidEmail(survivorEmailAddress)) missingFields.push('survivorEmailAddress');
  if (!survivorPhoneNumber || !isValidPhoneNumber(survivorPhoneNumber)) missingFields.push('survivorPhoneNumber');
  if (!primaryLanguage) missingFields.push('primaryLanguage');
  if (!relationshipToVictim) missingFields.push('relationshipToVictim');
  if (!crimeType) missingFields.push('crimeType');
  if (!survivorPreferredContactMethod) missingFields.push('survivorPreferredContactMethod');
  if (isGunViolence === undefined) missingFields.push('isGunViolence');
  if (outreachLetterSent === undefined) missingFields.push('outreachLetterSent');
  if (transferredToCCWaitlist === undefined) missingFields.push('transferredToCCWaitlist');
  if (followUpLetterSent === undefined) missingFields.push('followUpLetterSent');
  if (transferredToETO === undefined) missingFields.push('transferredToETO');

  if (missingFields.length > 0) {
    return res.status(400).json({ error: 'Missing fields in the request body', fields: missingFields });
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
      guardianAddress,
      guardianPhone,
      guardianEmail,
      guardianPreferredContactMethod,
      survivorEmailAddress,
      survivorAddress,
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
      homAddress,
      homZipCode,
      homDecedentAge,
      homDecendentSex,
      homDecedentRace,
      homDecedentEthnicity,
      homFMVNum,
      homMEONum,
      homeMNum,
      homCaseInformation,
      historyOfCommunication,
      victimServicesOutcome,
      counsellingServicesOutcome,
      youthServicesOutcome,
      outreachLetterSent,
      transferredToCCWaitlist,
      followUpLetterSent,
      transferredToETO,
      incidentAddress,
      incidentAddressZip,
      incidentAddressCity,
      incidentAddressState,
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

const buildYVOOutcomesString = async (
  youthServicesOutcome: youthServicesOutcomeItem,
) => {
  const outcomes = [];
  if (youthServicesOutcome.eligibleForYVOServices) {
    outcomes.push('eligible for YVO Services');
  }
  if (youthServicesOutcome.assignedToYVOTherapist) {
    outcomes.push('assigned to YVO therapist');
  }
  if (youthServicesOutcome.addedToYVOIndividualTherapyWaitlist) {
    outcomes.push('added to YVO individual therapy waitlist');
  }
  if (youthServicesOutcome.assignedToYVOGroup) {
    outcomes.push('assigned to YVO group');
  }
  if (youthServicesOutcome.addedToYVOGroupWaitlist) {
    outcomes.push('added to YVO group waitlist');
  }

  let outcomeString = '';
  if (outcomes.length > 0) {
    outcomeString = outcomeString.concat(outcomes[0]);
    // if len = 2, format would be 'outcome1 and outcome2'
    if (outcomes.length === 2) {
      outcomeString = outcomeString.concat('and', outcomes[1]);
    } else {
      for (let i = 1; i < outcomes.length; i += 1) {
        if (i === outcomes.length - 1) {
          return outcomeString.concat(', and', outcomes[i]);
        }
        outcomeString = outcomeString.concat(', ', outcomes[i]);
      }
    }
  }

  return outcomeString;
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
    homAddress,
    homZipCode,
    homDecedentAge,
    homDecendentSex,
    homDecedentRace,
    homDecedentEthnicity,
    homFMVNum,
    homMEONum,
    homeMNum,
    homCaseInformation,
    historyOfCommunication,
    outreachLetterSent,
    transferredToCCWaitlist,
    followUpLetterSent,
    transferredToETO,
    victimServicesOutcome,
    counsellingServicesOutcome,
    youthServicesOutcome,
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
      homAddress,
      homZipCode,
      homDecedentAge,
      homDecendentSex,
      homDecedentRace,
      homDecedentEthnicity,
      homFMVNum,
      homMEONum,
      homeMNum,
      homCaseInformation,
      historyOfCommunication,
      outreachLetterSent,
      transferredToCCWaitlist,
      followUpLetterSent,
      transferredToETO,
      victimServicesOutcome,
      counsellingServicesOutcome,
      youthServicesOutcome,
    );

    const staffEmail = staffAssigned?.email;
    const staffNumber = staffAssigned?.phone;
    const staffFirstName = staffAssigned?.firstName || 'last name placeholder';
    const staffLastName = staffAssigned?.lastName || 'first name placeholder';
    const staffDepartment = staffAssigned?.department;
    const nameArr = survivorName.split(' ');
    const survivorInitials = `${nameArr[0].charAt(0)}${nameArr[
      nameArr.length - 1
    ].charAt(0)}`;
    if (
      status === 'Assigned' &&
      !prevReferral?.staffAssigned &&
      staffDepartment !== 'Youth Services'
    ) {
      const msgRep = {
        to: `${agencyRepEmail}`,
        from: 'bach.tran@hack4impact.org',
        subject: `Update for ${survivorInitials} to AVP for ${serviceRequested} - Assigned to ${staffFirstName} ${staffLastName}`,
        html: `<div>Hi ${agencyRepName}, 
        <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>, for the service <strong>${serviceRequested}</strong>.</p>
        <p>We are emailing to let you know that this referral was assigned to <strong>${staffFirstName} ${staffLastName}</strong>. Below is their contact information.</p>
        <p>Phone number: ${staffNumber}</p>
        <p>Email: ${staffEmail}</p>
        <p>If you have any questions please feel free to email the staff contact listed above.</p>
        Thank you,
        <br></br>
        Anti-Violence Partnership of Philadelphia
        <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
        </div>`,
      };

      sgMail
        .send(msgRep)
        .then((response: any) => {
          console.log(response);
          console.log(
            'Email confirmation for assigned referral sent successfully',
          );
        })
        .catch((error: any) => {
          next(
            ApiError.internal(
              `Unable to send referral confirmation email due to the following error: ${error}`,
            ),
          );
        });

      const msgStaff = {
        to: `${staffEmail}`,
        from: 'bach.tran@hack4impact.org',
        subject: `A referral for ${survivorInitials} to AVP has been assigned to you`,
        html: `<div>Hi ${staffFirstName}, 
        <p>A referral for ${survivorName} for the service ${serviceRequested} has been assigned to you in AVP's Outreach Database. Please login at website link to process the referral.</p>
        Thank you,
        <br></br>
        Anti-Violence Partnership of Philadelphia
        <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
        </div>`,
      };

      sgMail
        .send(msgStaff)
        .then((response: any) => {
          console.log(response);
          console.log(
            'Email confirmation for completed referral sent successfully',
          );
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
        Thank you,
        <br></br>
        Anti-Violence Partnership of Philadelphia
        <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
        </div>`,
      };
      if (
        staffDepartment === 'Counseling Services' ||
        staffDepartment === 'Victim Services'
      ) {
        msg.html = `<div>Hi ${agencyRepName}, 
        <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>, for the service <strong>${serviceRequested}</strong>.</p>
        <p>We are emailing to let you know that we established contact with <strong>${survivorName}</strong> and this referral has been marked as <strong>completed</strong>.</p>
        Thank you,
        <br></br>
        Anti-Violence Partnership of Philadelphia
        <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
        </div>`;
      } else if (staffDepartment === 'Youth Services') {
        const outcomes = buildYVOOutcomesString(youthServicesOutcome);

        msg.html = `<div>Hi ${agencyRepName}, 
        <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>, for the service <strong>${serviceRequested}</strong>.</p>
        <p>${survivorName} was ${outcomes}. If a YVO staff member was assigned, they will be contacting you to schedule an appointment. If you have any questions, you can contact the Director of Youth Services, Lorenzo Shedrick, at <strong>lshedrick@avpphila.org</strong>.</p>
        Thank you,
        <br></br>
        Anti-Violence Partnership of Philadelphia
        <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
        </div>`;
      }
      sgMail
        .send(msg)
        .then((response: any) => {
          console.log(response);
          console.log(
            'Email confirmation for completed referral sent successfully',
          );
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
  const user: IUser | undefined = req.user as IUser;
  const {
    dateOfCommunication,
    method,
    notes,
    didEstablishedContact,
    dateOfNextCommunication,
  } = req.body;
  if (
    !dateOfCommunication ||
    !method ||
    didEstablishedContact == null ||
    !dateOfNextCommunication
  ) {
    next(
      ApiError.missingFields([
        'dateOfCommunication',
        'method',
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
  const user: IUser | undefined = req.user as IUser;
  const {
    dateOfCommunication,
    method,
    notes,
    didEstablishedContact,
    dateOfNextCommunication,
  } = req.body;

  if (
    !dateOfCommunication ||
    !method ||
    didEstablishedContact == null ||
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

const getVictimServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;

  try {
    const outcome = (await getReferralById(id))?.victimServicesOutcome;
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to get referral by id due to the following error: ${err}`,
      ),
    );
  }
};

const createVictimServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  let {
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
  } = req.body;
  if (eligibleForAVPVictimServices === undefined) {
    eligibleForAVPVictimServices = false;
  }
  if (sentVCAPInfotoClient === undefined) {
    sentVCAPInfotoClient = false;
  }
  if (avpAdvocateAssistingWithVCAP === undefined) {
    avpAdvocateAssistingWithVCAP = false;
  }
  if (vsAgencyName === undefined) {
    vsAgencyName = '';
  }
  if (referredToOtherVSAgencyForVCAP === undefined) {
    referredToOtherVSAgencyForVCAP = false;
  }
  if (avpAdvocateProvidingCourtSupport === undefined) {
    avpAdvocateProvidingCourtSupport = false;
  }
  if (clientWorkingWithFMV === undefined) {
    clientWorkingWithFMV = false;
  }
  if (fmvNumber === undefined) {
    fmvNumber = false;
  }
  if (referredToOtherAgencyForCourt === undefined) {
    referredToOtherAgencyForCourt = false;
  }
  if (courtSupportAgencyName === undefined) {
    courtSupportAgencyName = '';
  }
  if (avpAdvocateContactedADA === undefined) {
    avpAdvocateContactedADA = false;
  }
  if (avpAdvocateContactedDetective === undefined) {
    avpAdvocateContactedDetective = false;
  }
  if (needsRelocationAssistance === undefined) {
    needsRelocationAssistance = false;
  }
  if (relocationReferralWasSubmitted === undefined) {
    relocationReferralWasSubmitted = false;
  }
  if (referredToAgencyForOtherServices === undefined) {
    referredToAgencyForOtherServices = false;
  }
  if (otherAgencyNames === undefined) {
    otherAgencyNames = '';
  }
  if (otherServices === undefined) {
    otherServices = '';
  }
  if (additionalNotes === undefined) {
    additionalNotes = '';
  }
  try {
    const outcome = await postVictimServicesOutcome(
      id,
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
    );
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to add to communication history due to the following error: ${err}`,
      ),
    );
  }
};

const updateVictimServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    id,
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
  } = req.body;

  try {
    const outcome = await putVictimServicesOutcome(
      id,
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
    );
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to add to communication history due to the following error: ${err}`,
      ),
    );
  }
};

const getCounsellingServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;

  try {
    const outcome = (await getReferralById(id))?.counsellingServicesOutcome;
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to get referral by id due to the following error: ${err}`,
      ),
    );
  }
};

const createCounsellingServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  let {
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
  } = req.body;
  if (eligibleForAVPCounsellingServices === undefined) {
    eligibleForAVPCounsellingServices = false;
  }
  if (receivingCrisisCounselling === undefined) {
    receivingCrisisCounselling = false;
  }
  if (scheduledIntakeApptForIndividualTherapy === undefined) {
    scheduledIntakeApptForIndividualTherapy = false;
  }
  if (intakeAppointmentOutcome === undefined) {
    intakeAppointmentOutcome = false;
  }
  if (receivingIndividualTherapy === undefined) {
    receivingIndividualTherapy = false;
  }
  if (therapistName === undefined) {
    therapistName = '';
  }
  if (addedToIndividualTherapyWaitlist === undefined) {
    addedToIndividualTherapyWaitlist = false;
  }
  if (referredForCounsellingServices === undefined) {
    referredForCounsellingServices = false;
  }
  if (counsellingAgency === undefined) {
    counsellingAgency = false;
  }
  if (sentAVPSupportGroupInfo === undefined) {
    sentAVPSupportGroupInfo = false;
  }
  if (attendingSupportGroup === undefined) {
    attendingSupportGroup = false;
  }
  if (supportGroupName === undefined) {
    supportGroupName = '';
  }
  if (addedToSupportGroupWaitlist === undefined) {
    addedToSupportGroupWaitlist = false;
  }
  if (additionalNotes === undefined) {
    additionalNotes = '';
  }
  try {
    const outcome = await postCounsellingServicesOutcome(
      id,
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
    );
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to add counselling services outcome due to the following error: ${err}`,
      ),
    );
  }
};

const updateCounsellingServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    id,
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
  } = req.body;

  try {
    const outcome = await putCounsellingServicesOutcome(
      id,
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
    );
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to add to communication history due to the following error: ${err}`,
      ),
    );
  }
};

const getYouthServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;

  try {
    const outcome = (await getReferralById(id))?.youthServicesOutcome;
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to get referral by id due to the following error: ${err}`,
      ),
    );
  }
};

const createYouthServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  let {
    eligibleForYVOServices,
    assignedToYVOTherapist,
    yvoStaffName,
    addedToYVOIndividualTherapyWaitlist,
    assignedToYVOGroup,
    addedToYVOGroupWaitlist,
    additionalNotes,
  } = req.body;
  if (eligibleForYVOServices === undefined) {
    eligibleForYVOServices = false;
  }
  if (assignedToYVOTherapist === undefined) {
    assignedToYVOTherapist = false;
  }
  if (yvoStaffName === undefined) {
    yvoStaffName = '';
  }
  if (addedToYVOIndividualTherapyWaitlist === undefined) {
    addedToYVOIndividualTherapyWaitlist = false;
  }
  if (assignedToYVOGroup === undefined) {
    assignedToYVOGroup = false;
  }
  if (addedToYVOGroupWaitlist === undefined) {
    addedToYVOGroupWaitlist = false;
  }
  if (additionalNotes === undefined) {
    additionalNotes = '';
  }
  try {
    const outcome = await postYouthServicesOutcome(
      id,
      eligibleForYVOServices,
      assignedToYVOTherapist,
      yvoStaffName,
      addedToYVOIndividualTherapyWaitlist,
      assignedToYVOGroup,
      addedToYVOGroupWaitlist,
      additionalNotes,
    );
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to add to communication history due to the following error: ${err}`,
      ),
    );
  }
};

const updateYouthServicesOutcome = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    id,
    eligibleForYVOServices,
    assignedToYVOTherapist,
    yvoStaffName,
    addedToYVOIndividualTherapyWaitlist,
    assignedToYVOGroup,
    addedToYVOGroupWaitlist,
    additionalNotes,
  } = req.body;

  try {
    const outcome = await putYouthServicesOutcome(
      id,
      eligibleForYVOServices,
      assignedToYVOTherapist,
      yvoStaffName,
      addedToYVOIndividualTherapyWaitlist,
      assignedToYVOGroup,
      addedToYVOGroupWaitlist,
      additionalNotes,
    );
    res.status(StatusCode.OK).json(outcome);
  } catch (err) {
    next(
      ApiError.internal(
        `Unable to add to communication history due to the following error: ${err}`,
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
  getVictimServicesOutcome,
  createVictimServicesOutcome,
  updateVictimServicesOutcome,
  getCounsellingServicesOutcome,
  createCounsellingServicesOutcome,
  updateCounsellingServicesOutcome,
  getYouthServicesOutcome,
  createYouthServicesOutcome,
  updateYouthServicesOutcome,
};
