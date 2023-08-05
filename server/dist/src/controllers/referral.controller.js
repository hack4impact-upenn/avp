"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadReferral = exports.deleteOutreachFile = exports.deleteFollowUpFile = exports.deleteReferralFile = exports.getOutreachFile = exports.createOutreachPDF = exports.getFollowUpFile = exports.createFollowUpPDF = exports.getReferralFile = exports.createRefferalPDF = exports.updateYouthServicesOutcome = exports.createYouthServicesOutcome = exports.getYouthServicesOutcome = exports.updateCounsellingServicesOutcome = exports.createCounsellingServicesOutcome = exports.getCounsellingServicesOutcome = exports.updateVictimServicesOutcome = exports.createVictimServicesOutcome = exports.getVictimServicesOutcome = exports.getDuplicates = exports.deleteHistory = exports.updateHistory = exports.addToHistory = exports.getCommunicationHistory = exports.updateReferral = exports.getReferral = exports.getDepartmentReferrals = exports.getReferrals = exports.createReferral = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const apiError_1 = __importDefault(require("../util/apiError"));
const aws_1 = __importDefault(require("../util/aws"));
const referral_service_1 = require("../services/referral.service");
const statusCode_1 = __importDefault(require("../util/statusCode"));
// SendGrid setup
const apiKey = process.env.SENDGRID_API_KEY;
mail_1.default.setApiKey(apiKey);
const { awsUpload, awsGet } = aws_1.default;
const setReferralStatus = (staffAssigned, historyOfCommunication, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
        }
        else {
            status = 'Completed';
        }
    }
    else if ((historyOfCommunication === null || historyOfCommunication === void 0 ? void 0 : historyOfCommunication.length) === 1 &&
        !((_a = historyOfCommunication[0]) === null || _a === void 0 ? void 0 : _a.didEstablishedContact)) {
        status = '1st unsuccessful attempt';
    }
    else if ((historyOfCommunication === null || historyOfCommunication === void 0 ? void 0 : historyOfCommunication.length) === 2 &&
        !((_b = historyOfCommunication[1]) === null || _b === void 0 ? void 0 : _b.didEstablishedContact)) {
        status = '2nd unsuccessful attempt';
    }
    else if ((historyOfCommunication === null || historyOfCommunication === void 0 ? void 0 : historyOfCommunication.length) === 3 &&
        !((_c = historyOfCommunication[2]) === null || _c === void 0 ? void 0 : _c.didEstablishedContact)) {
        status = '3rd unsuccessful attempt';
    }
    if (followUpLetterSent) {
        status = 'Follow-up letter sent';
    }
    return status;
});
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+?1?\s*\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    return phoneRegex.test(phoneNumber);
}
const uploadReferral = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // load in file from req body
    const { file } = req;
    // Check if a file was provided
    if (!file) {
        next(apiError_1.default.internal('No file provided'));
        return;
    }
    // parse file
    if (file.mimetype === 'text/csv') {
        // Handle CSV file
        const promises = [];
        console.log(file);
        fs_1.default.createReadStream(file.path)
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => {
            // Process each row here
            // The row variable will contain an object with key-value pairs for each field in the CSV line
            // create referral obj for each row
            const newReferral = {
                staffName: row['Staff Name'] || undefined,
                status: 'Unassigned',
                departmentInCharge: undefined,
                program: undefined,
                staffAssigned: undefined,
                therapistAssigned: undefined,
                isReferral: row['Is Referral?'] || true,
                survivorName: row['Name of Survivor'] || 'NA',
                serviceRequested: row['Service Requested'],
                agencyThatReferred: row['Referral Agency'],
                agencyRepName: row['Agency Rep Name'] || 'NA',
                agencyRepEmail: row['Agency Rep Email'] || 'NA',
                agencyRepPhone: row['Agency Rep Phone #'] || 'NA',
                survivorGender: row['Survivor Gender'] || 'NA',
                survivorRace: row['Survivor Race/Ethnicity'] || 'NA',
                survivorDOB: row['Survivor DOB'] && !/[a-zA-Z]/.test(row['Survivor DOB'])
                    ? row['Survivor DOB']
                    : undefined,
                survivorAge: row['Survivor Age'] && !/[a-zA-Z]/.test(row['Survivor Age'])
                    ? row['Survivor Age']
                    : undefined,
                survivorSchoolOrCommunitySite: undefined,
                survivorGrade: undefined,
                survivorPreferredContactMethod: row['Survivor Preferred Method of Contact'] || 'NA',
                isGuardianResponsible: undefined,
                guardianName: row['Name of Adult'] || 'NA',
                guardianRelationship: undefined,
                guardianAddress: row['Street Address of Adult'] &&
                    row['City of Adult'] &&
                    row['State of Adult'] &&
                    row['Zip Code of Adult']
                    ? `${row['Street Address of Adult']}, ${row['City of Adult']}, ${row['State of Adult']} ${row['Zip Code of Adult']}}`
                    : undefined,
                guardianPhone: row['Phone # of Adult'] || 'NA',
                guardianEmail: row['Email of Adult'] || 'NA',
                guardianPreferredContactMethod: row['Preferred Contact Method of Adult'] || 'NA',
                survivorAddress: row['Street Address of Adult'] &&
                    row['City of Adult'] &&
                    row['State of Adult'] &&
                    row['Zip Code of Adult']
                    ? `${row['Survivor Street Address']}, ${row['Survivor City']}, ${row['Survivor State']} ${row['Survivor Zip Code']}`
                    : undefined,
                survivorEmailAddress: row['Survivor Email Address'] || 'NA',
                survivorPhoneNumber: row['Survivor Phone #'] || 'NA',
                notesFromOrg: row['Referral Notes'] || 'NA',
                relationshipToVictim: row['Relationship to Victim'] || 'NA',
                crimeDCNum: undefined,
                crimeDistrict: undefined,
                crimeDate: row['Date of Crime'] || 'NA',
                crimeType: row['Type of Crime/Victimization'] || 'NA',
                isGunViolence: row['Is Gun Violence?'] || false,
                homDecedent: row["Victim's Name"] || 'NA',
                homDateOfDeath: row['Date of Death'] || 'NA',
                homType: row['Type of Crime/Victimization'] || 'NA',
                homLocation: undefined,
                homAddress: undefined,
                homZipCode: undefined,
                homDecedentAge: undefined,
                homDecedentSex: row["Victim's Gender"] || 'NA',
                homDecedentRace: row["Victim's Race"] || 'NA',
                homDecedentEthnicity: '',
                homFMVNum: undefined,
                homMEONum: undefined,
                homeMNum: undefined,
                homCaseInformation: undefined,
                historyOfCommunication: undefined,
                outreachLetterSent: row['Outreach Letter Sent?'] || false,
                transferredToCCWaitlist: row['Transferred to CC Waitlist?'] || false,
                followUpLetterSent: row['Follow-up Letter Sent?'] || false,
                transferredToETO: row['Transferred to ETO?'] || false,
                counsellingServicesOutcome: row['Counselling Services Outcome'] || undefined,
                youthServicesOutcome: row['Youth Services Outcome'] || undefined,
                victimServicesOutcome: row['Victime Services Outcome'] || undefined,
                incidentAddress: row['Incident Address'] || undefined,
                incidentAddressZip: row['Incident Address Zip'] || undefined,
                incidentAddressCity: row['Incident Address City'] || undefined,
                incidentAddressState: row['Incident Address State'] || undefined,
                primaryLanguage: row['Primary Language'] || undefined,
            };
            // if (
            //   !newReferral.status ||
            //   newReferral.isReferral === undefined ||
            //   !newReferral.survivorName ||
            //   !newReferral.serviceRequested ||
            //   !newReferral.agencyThatReferred ||
            //   !newReferral.agencyRepName ||
            //   !newReferral.agencyRepEmail ||
            //   !newReferral.agencyRepPhone ||
            //   !newReferral.survivorEmailAddress ||
            //   !newReferral.survivorPhoneNumber ||
            //   !newReferral.relationshipToVictim ||
            //   !newReferral.crimeType ||
            //   !newReferral.survivorPreferredContactMethod ||
            //   newReferral.isGunViolence === undefined ||
            //   newReferral.outreachLetterSent === undefined ||
            //   newReferral.transferredToCCWaitlist === undefined ||
            //   newReferral.followUpLetterSent === undefined ||
            //   newReferral.transferredToETO === undefined
            // ) {
            //   next(
            //     ApiError.missingFields([
            //       'timestamp',
            //       'status',
            //       'isReferral',
            //       'survivorName',
            //       'serviceRequested',
            //       'agencyThatReferred',
            //       'agencyRepName',
            //       'agencyRepEmail',
            //       'agencyRepPhone',
            //       'survivorEmailAddress',
            //       'survivorPhoneNumber',
            //       'relationshipToVictim',
            //       'crimeType',
            //       'survivorPreferredContactMethod',
            //       'isGunViolence',
            //       'outreachLetterSent',
            //       'transferredToCCWaitlist',
            //       'followUpLetterSent',
            //       'transferredToETO',
            //     ]),
            //   );
            //   return;
            // }
            promises.push((0, referral_service_1.createNewReferral)(newReferral.staffName, newReferral.status, newReferral.departmentInCharge, newReferral.program, newReferral.staffAssigned, newReferral.therapistAssigned, newReferral.isReferral, newReferral.survivorName, newReferral.serviceRequested, newReferral.agencyThatReferred, newReferral.agencyRepName, newReferral.agencyRepEmail, newReferral.agencyRepPhone, newReferral.survivorGender, newReferral.survivorRace, newReferral.survivorDOB, newReferral.survivorAge, newReferral.survivorSchoolOrCommunitySite, newReferral.survivorGrade, newReferral.isGuardianResponsible, newReferral.guardianName, newReferral.guardianRelationship, newReferral.guardianAddress, newReferral.guardianPhone, newReferral.guardianEmail, newReferral.guardianPreferredContactMethod, newReferral.survivorEmailAddress, newReferral.survivorAddress, newReferral.survivorPhoneNumber, newReferral.survivorPreferredContactMethod, newReferral.notesFromOrg, newReferral.primaryLanguage, newReferral.relationshipToVictim, newReferral.crimeDCNum, newReferral.crimeDistrict, newReferral.crimeDate, newReferral.crimeType, newReferral.isGunViolence, newReferral.homDecedent, newReferral.homDateOfDeath, newReferral.homType, newReferral.homLocation, newReferral.homAddress, newReferral.homZipCode, newReferral.homDecedentAge, newReferral.homDecedentSex, newReferral.homDecedentRace, newReferral.homDecedentEthnicity, newReferral.homFMVNum, newReferral.homMEONum, newReferral.homeMNum, newReferral.homCaseInformation, newReferral.historyOfCommunication, newReferral.victimServicesOutcome, newReferral.counsellingServicesOutcome, newReferral.youthServicesOutcome, newReferral.outreachLetterSent, newReferral.transferredToCCWaitlist, newReferral.followUpLetterSent, newReferral.transferredToETO, newReferral.incidentAddress, newReferral.incidentAddressZip, newReferral.incidentAddressCity, newReferral.incidentAddressState));
            console.log('here');
        })
            .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield Promise.all(promises); // Await all promises from each row
                res.sendStatus(statusCode_1.default.CREATED);
            }
            catch (error) {
                next(apiError_1.default.internal(`Unable to create referral due to the following error: ${error}`));
            }
        }));
    }
    else {
        // Unsupported file type
        next(apiError_1.default.internal('Unsupported file type'));
    }
});
exports.uploadReferral = uploadReferral;
const createReferral = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('HIT ENDPOINT - CREATE REFFERRAL');
    let { staffName, status, departmentInCharge, program, staffAssigned, therapistAssigned, isReferral, survivorName, serviceRequested, agencyThatReferred, agencyRepName, agencyRepEmail, agencyRepPhone, survivorGender, survivorRace, survivorDOB, survivorAge, survivorSchoolOrCommunitySite, survivorGrade, isGuardianResponsible, guardianName, guardianRelationship, guardianAddress, guardianPhone, guardianEmail, guardianPreferredContactMethod, survivorEmailAddress, survivorAddress, survivorPhoneNumber, survivorPreferredContactMethod, notesFromOrg, primaryLanguage, relationshipToVictim, crimeDCNum, crimeDistrict, crimeDate, crimeType, isGunViolence, homDecedent, homDateOfDeath, homType, homLocation, homAddress, homZipCode, homDecedentAge, homDecendentSex, homDecedentRace, homDecedentEthnicity, homFMVNum, homMEONum, homeMNum, homCaseInformation, historyOfCommunication, victimServicesOutcome, counsellingServicesOutcome, youthServicesOutcome, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent, transferredToETO, incidentAddress, incidentAddressZip, incidentAddressCity, incidentAddressState, serviceRequestedVictim, otherServiceRequestedVictim, } = req.body;
    if (serviceRequestedVictim) {
        serviceRequested = `${serviceRequested}, ${serviceRequestedVictim}`;
    }
    if (otherServiceRequestedVictim) {
        serviceRequested = `${serviceRequested}, ${otherServiceRequestedVictim}`;
    }
    if (outreachLetterSent == undefined)
        outreachLetterSent = false;
    if (transferredToCCWaitlist == undefined)
        transferredToCCWaitlist = false;
    if (followUpLetterSent == undefined)
        followUpLetterSent = false;
    if (transferredToETO == undefined)
        transferredToETO = false;
    if (isReferral == undefined)
        isReferral = false;
    if (!historyOfCommunication) {
        historyOfCommunication = [];
        console.log(historyOfCommunication);
    }
    const missingFields = [];
    if (isGunViolence === null)
        isGunViolence = false;
    // if (isGuardianResponsible == undefined) missingFields.push('isGuardianResponsible');
    if (isGuardianResponsible) {
        if (!guardianName)
            missingFields.push('guardianName');
        if (!guardianRelationship)
            missingFields.push('guardianRelationship');
        if (!guardianAddress)
            missingFields.push('guardianAddress');
        if (!guardianPhone) {
            missingFields.push('guardianPhone');
        }
        else if (!survivorPhoneNumber ||
            !isValidPhoneNumber(survivorPhoneNumber)) {
            survivorPhoneNumber = guardianPhone;
        }
        if (!guardianEmail || !isValidEmail(guardianEmail)) {
            missingFields.push('guardianEmail');
        }
        else if (!survivorEmailAddress || !isValidEmail(survivorEmailAddress)) {
            survivorEmailAddress = guardianEmail;
        }
        if (!guardianPreferredContactMethod)
            missingFields.push('guardianPreferredContactMethod');
        else if (!survivorPreferredContactMethod)
            survivorPreferredContactMethod = guardianPreferredContactMethod;
    }
    if (isReferral === undefined || isReferral === null)
        missingFields.push('isReferral');
    if (!survivorName)
        missingFields.push('survivorName');
    if (!serviceRequested)
        missingFields.push('serviceRequested');
    if (!agencyThatReferred)
        missingFields.push('agencyThatReferred');
    if (!agencyRepName)
        missingFields.push('agencyRepName');
    if (!agencyRepEmail || !isValidEmail(agencyRepEmail))
        missingFields.push('agencyRepEmail');
    if (!agencyRepPhone)
        missingFields.push('agencyRepPhone');
    if (!survivorEmailAddress || !isValidEmail(survivorEmailAddress))
        missingFields.push('survivorEmailAddress');
    if (!survivorPhoneNumber || !isValidPhoneNumber(survivorPhoneNumber))
        missingFields.push('survivorPhoneNumber');
    if (!primaryLanguage)
        missingFields.push('primaryLanguage');
    if (!relationshipToVictim)
        missingFields.push('relationshipToVictim');
    if (!crimeType)
        missingFields.push('crimeType');
    if (!survivorPreferredContactMethod)
        missingFields.push('survivorPreferredContactMethod');
    if (isGunViolence === undefined)
        missingFields.push('isGunViolence');
    if (outreachLetterSent === undefined)
        missingFields.push('outreachLetterSent');
    if (transferredToCCWaitlist === undefined)
        missingFields.push('transferredToCCWaitlist');
    if (followUpLetterSent === undefined)
        missingFields.push('followUpLetterSent');
    if (transferredToETO === undefined)
        missingFields.push('transferredToETO');
    if (missingFields.length > 0) {
        return res.status(400).json({
            error: 'Missing fields in the request body',
            fields: missingFields,
        });
    }
    try {
        const status = yield setReferralStatus(staffAssigned, historyOfCommunication, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent);
        yield (0, referral_service_1.createNewReferral)(staffName, status, departmentInCharge, program, staffAssigned, therapistAssigned, isReferral, survivorName, serviceRequested, agencyThatReferred, agencyRepName, agencyRepEmail, agencyRepPhone, survivorGender, survivorRace, survivorDOB, survivorAge, survivorSchoolOrCommunitySite, survivorGrade, isGuardianResponsible, guardianName, guardianRelationship, guardianAddress, guardianPhone, guardianEmail, guardianPreferredContactMethod, survivorEmailAddress, survivorAddress, survivorPhoneNumber, survivorPreferredContactMethod, notesFromOrg, primaryLanguage, relationshipToVictim, crimeDCNum, crimeDistrict, crimeDate, crimeType, isGunViolence, homDecedent, homDateOfDeath, homType, homLocation, homAddress, homZipCode, homDecedentAge, homDecendentSex, homDecedentRace, homDecedentEthnicity, homFMVNum, homMEONum, homeMNum, homCaseInformation, historyOfCommunication, victimServicesOutcome, counsellingServicesOutcome, youthServicesOutcome, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent, transferredToETO, incidentAddress, incidentAddressZip, incidentAddressCity, incidentAddressState);
        const nameArr = survivorName.split(' ');
        const survivorInitials = `${nameArr[0].charAt(0)}${nameArr[nameArr.length - 1].charAt(0)}`;
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
        mail_1.default
            .send(msg)
            .then((response) => {
            console.log(response);
            console.log('Email confirmation sent successfully');
        })
            .catch((error) => {
            next(apiError_1.default.internal(`Unable to send referral confirmation email due to the following error: ${error}`));
        });
        res.sendStatus(statusCode_1.default.CREATED);
    }
    catch (err) {
        console.log(err);
        next(apiError_1.default.internal(`Unable to create referral due to the following error: ${err}`));
    }
});
exports.createReferral = createReferral;
const getReferrals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const referrals = yield (0, referral_service_1.getAllReferrals)();
        res.status(statusCode_1.default.OK).json(referrals);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get all referrals due to the following error: ${err}`));
    }
});
exports.getReferrals = getReferrals;
const getDepartmentReferrals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { department } = req.params;
    try {
        const referrals = yield (0, referral_service_1.getAllDepartmentReferrals)(department);
        res.status(statusCode_1.default.OK).json(referrals);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get all referrals of the department due to the following error: ${err}`));
    }
});
exports.getDepartmentReferrals = getDepartmentReferrals;
const getReferral = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const referral = yield (0, referral_service_1.getReferralById)(id);
        res.status(statusCode_1.default.OK).json(referral);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get referral by id due to the following error: ${err}`));
    }
});
exports.getReferral = getReferral;
const buildYVOOutcomesString = (youthServicesOutcome) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        else {
            for (let i = 1; i < outcomes.length; i += 1) {
                if (i === outcomes.length - 1) {
                    return outcomeString.concat(', and', outcomes[i]);
                }
                outcomeString = outcomeString.concat(', ', outcomes[i]);
            }
        }
    }
    return outcomeString;
});
const updateReferral = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { departmentInCharge, program, staffAssigned, therapistAssigned, isReferral, survivorName, serviceRequested, agencyThatReferred, agencyRepName, agencyRepEmail, agencyRepPhone, survivorGender, survivorRace, survivorDOB, survivorAge, survivorSchoolOrCommunitySite, survivorGrade, survivorPreferredContactMethod, isGuardianResponsible, guardianName, guardianRelationship, guardianAddress, guardianPhone, guardianEmail, guardianPreferredContactMethod, survivorAddress, survivorEmailAddress, survivorPhoneNumber, notesFromOrg, primaryLanguage, relationshipToVictim, crimeDCNum, crimeDistrict, crimeDate, crimeType, isGunViolence, homDecedent, homDateOfDeath, homType, homLocation, homAddress, homZipCode, homDecedentAge, homDecendentSex, homDecedentRace, homDecedentEthnicity, homFMVNum, homMEONum, homeMNum, homCaseInformation, historyOfCommunication, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent, transferredToETO, victimServicesOutcome, counsellingServicesOutcome, youthServicesOutcome, } = req.body;
    if (isReferral === undefined ||
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
        transferredToETO === undefined) {
        next(apiError_1.default.missingFields([
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
        ]));
        return;
    }
    try {
        const status = yield setReferralStatus(staffAssigned, historyOfCommunication, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent);
        const prevReferral = yield (0, referral_service_1.getReferralById)(id);
        const referral = yield (0, referral_service_1.updateReferralById)(id, status, departmentInCharge, program, staffAssigned, therapistAssigned, isReferral, survivorName, serviceRequested, agencyThatReferred, agencyRepName, agencyRepEmail, agencyRepPhone, survivorGender, survivorRace, survivorDOB, survivorAge, survivorSchoolOrCommunitySite, survivorGrade, survivorPreferredContactMethod, isGuardianResponsible, guardianName, guardianRelationship, guardianAddress, guardianPhone, guardianEmail, guardianPreferredContactMethod, survivorAddress, survivorEmailAddress, survivorPhoneNumber, notesFromOrg, primaryLanguage, relationshipToVictim, crimeDCNum, crimeDistrict, crimeDate, crimeType, isGunViolence, homDecedent, homDateOfDeath, homType, homLocation, homAddress, homZipCode, homDecedentAge, homDecendentSex, homDecedentRace, homDecedentEthnicity, homFMVNum, homMEONum, homeMNum, homCaseInformation, historyOfCommunication, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent, transferredToETO, victimServicesOutcome, counsellingServicesOutcome, youthServicesOutcome);
        const staffEmail = staffAssigned === null || staffAssigned === void 0 ? void 0 : staffAssigned.email;
        const staffNumber = staffAssigned === null || staffAssigned === void 0 ? void 0 : staffAssigned.phone;
        const staffFirstName = (staffAssigned === null || staffAssigned === void 0 ? void 0 : staffAssigned.firstName) || 'last name placeholder';
        const staffLastName = (staffAssigned === null || staffAssigned === void 0 ? void 0 : staffAssigned.lastName) || 'first name placeholder';
        const staffDepartment = staffAssigned === null || staffAssigned === void 0 ? void 0 : staffAssigned.department;
        const nameArr = survivorName.split(' ');
        const survivorInitials = `${nameArr[0].charAt(0)}${nameArr[nameArr.length - 1].charAt(0)}`;
        if (status === 'Assigned' &&
            !(prevReferral === null || prevReferral === void 0 ? void 0 : prevReferral.staffAssigned) &&
            staffDepartment !== 'Youth Services') {
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
            mail_1.default
                .send(msgRep)
                .then((response) => {
                console.log(response);
                console.log('Email confirmation for assigned referral sent successfully');
            })
                .catch((error) => {
                next(apiError_1.default.internal(`Unable to send referral confirmation email due to the following error: ${error}`));
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
            mail_1.default
                .send(msgStaff)
                .then((response) => {
                console.log(response);
                console.log('Email confirmation for completed referral sent successfully');
            })
                .catch((error) => {
                next(apiError_1.default.internal(`Unable to send referral confirmation email due to the following error: ${error}`));
            });
        }
        else if (status === 'Completed') {
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
            if (staffDepartment === 'Counseling Services' ||
                staffDepartment === 'Victim Services') {
                msg.html = `<div>Hi ${agencyRepName}, 
        <p>Thank you for submitting a referral on behalf of ${agencyThatReferred} for <strong>${survivorName}</strong>, for the service <strong>${serviceRequested}</strong>.</p>
        <p>We are emailing to let you know that we established contact with <strong>${survivorName}</strong> and this referral has been marked as <strong>completed</strong>.</p>
        Thank you,
        <br></br>
        Anti-Violence Partnership of Philadelphia
        <p style="color:gray">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p>
        </div>`;
            }
            else if (staffDepartment === 'Youth Services') {
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
            mail_1.default
                .send(msg)
                .then((response) => {
                console.log(response);
                console.log('Email confirmation for completed referral sent successfully');
            })
                .catch((error) => {
                next(apiError_1.default.internal(`Unable to send referral confirmation email due to the following error: ${error}`));
            });
        }
        res.status(statusCode_1.default.OK).json(referral);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to update referral due to the following error: ${err}`));
    }
});
exports.updateReferral = updateReferral;
const getCommunicationHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const referral = yield (0, referral_service_1.getReferralById)(id);
        res.status(statusCode_1.default.OK).json(referral === null || referral === void 0 ? void 0 : referral.historyOfCommunication);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get communication history due to the following error: ${err}`));
    }
});
exports.getCommunicationHistory = getCommunicationHistory;
const addToHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    const { dateOfCommunication, method, notes, didEstablishedContact, dateOfNextCommunication, } = req.body;
    if (!dateOfCommunication ||
        !method ||
        didEstablishedContact == null ||
        !dateOfNextCommunication) {
        next(apiError_1.default.missingFields([
            'dateOfCommunication',
            'method',
            'didEstablishedContact',
            'dateOfNextCommunication',
        ]));
        return;
    }
    try {
        const referral = yield (0, referral_service_1.addToCommunicationHistory)(id, new Date(dateOfCommunication), method, user, notes, didEstablishedContact, new Date(dateOfNextCommunication));
        res.status(statusCode_1.default.OK).json(referral);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to add to communication history due to the following error: ${err}`));
    }
});
exports.addToHistory = addToHistory;
const updateHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, index } = req.params;
    const user = req.user;
    const { dateOfCommunication, method, notes, didEstablishedContact, dateOfNextCommunication, } = req.body;
    if (!dateOfCommunication ||
        !method ||
        didEstablishedContact == null ||
        !dateOfNextCommunication) {
        next(apiError_1.default.missingFields([
            'dateOfCommunication',
            'method',
            'user',
            'didEstablishedContact',
            'dateOfNextCommunication',
        ]));
        return;
    }
    try {
        const referral = yield (0, referral_service_1.updateCommunicationHistory)(id, index, dateOfCommunication, method, user, notes, didEstablishedContact, dateOfNextCommunication);
        res.status(statusCode_1.default.OK).json(referral);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to update communication history due to the following error: ${err}`));
    }
});
exports.updateHistory = updateHistory;
const deleteHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, index } = req.params;
    try {
        const referral = yield (0, referral_service_1.deleteCommunicationHistory)(id, Number(index));
        res.status(statusCode_1.default.OK).json(referral);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to delete communication history due to the following error: ${err}`));
    }
});
exports.deleteHistory = deleteHistory;
const getDuplicates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.query.phoneNumber || '';
    const email = req.query.email || '';
    if (typeof phoneNumber !== 'string' || typeof email !== 'string') {
        next(apiError_1.default.internal('Invalid query types'));
        return;
    }
    try {
        const referrals = yield (0, referral_service_1.getDuplicateReferrals)(phoneNumber, email);
        res.status(statusCode_1.default.OK).json(referrals);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get duplicate referrals due to the following error: ${err}`));
    }
});
exports.getDuplicates = getDuplicates;
const getVictimServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { id } = req.params;
    try {
        const outcome = (_d = (yield (0, referral_service_1.getReferralById)(id))) === null || _d === void 0 ? void 0 : _d.victimServicesOutcome;
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get referral by id due to the following error: ${err}`));
    }
});
exports.getVictimServicesOutcome = getVictimServicesOutcome;
const createVictimServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { eligibleForAVPVictimServices, sentVCAPInfotoClient, avpAdvocateAssistingWithVCAP, referredToOtherVSAgencyForVCAP, vsAgencyName, avpAdvocateProvidingCourtSupport, clientWorkingWithFMV, fmvNumber, referredToOtherAgencyForCourt, courtSupportAgencyName, avpAdvocateContactedADA, avpAdvocateContactedDetective, needsRelocationAssistance, relocationReferralWasSubmitted, referredToAgencyForOtherServices, otherAgencyNames, otherServices, additionalNotes, } = req.body;
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
        const outcome = yield (0, referral_service_1.postVictimServicesOutcome)(id, eligibleForAVPVictimServices, sentVCAPInfotoClient, avpAdvocateAssistingWithVCAP, referredToOtherVSAgencyForVCAP, vsAgencyName, avpAdvocateProvidingCourtSupport, clientWorkingWithFMV, fmvNumber, referredToOtherAgencyForCourt, courtSupportAgencyName, avpAdvocateContactedADA, avpAdvocateContactedDetective, needsRelocationAssistance, relocationReferralWasSubmitted, referredToAgencyForOtherServices, otherAgencyNames, otherServices, additionalNotes);
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to add to communication history due to the following error: ${err}`));
    }
});
exports.createVictimServicesOutcome = createVictimServicesOutcome;
const updateVictimServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, eligibleForAVPVictimServices, sentVCAPInfotoClient, avpAdvocateAssistingWithVCAP, referredToOtherVSAgencyForVCAP, vsAgencyName, avpAdvocateProvidingCourtSupport, clientWorkingWithFMV, fmvNumber, referredToOtherAgencyForCourt, courtSupportAgencyName, avpAdvocateContactedADA, avpAdvocateContactedDetective, needsRelocationAssistance, relocationReferralWasSubmitted, referredToAgencyForOtherServices, otherAgencyNames, otherServices, additionalNotes, } = req.body;
    try {
        const outcome = yield (0, referral_service_1.putVictimServicesOutcome)(id, eligibleForAVPVictimServices, sentVCAPInfotoClient, avpAdvocateAssistingWithVCAP, referredToOtherVSAgencyForVCAP, vsAgencyName, avpAdvocateProvidingCourtSupport, clientWorkingWithFMV, fmvNumber, referredToOtherAgencyForCourt, courtSupportAgencyName, avpAdvocateContactedADA, avpAdvocateContactedDetective, needsRelocationAssistance, relocationReferralWasSubmitted, referredToAgencyForOtherServices, otherAgencyNames, otherServices, additionalNotes);
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to add to communication history due to the following error: ${err}`));
    }
});
exports.updateVictimServicesOutcome = updateVictimServicesOutcome;
const getCounsellingServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { id } = req.params;
    try {
        const outcome = (_e = (yield (0, referral_service_1.getReferralById)(id))) === null || _e === void 0 ? void 0 : _e.counsellingServicesOutcome;
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get referral by id due to the following error: ${err}`));
    }
});
exports.getCounsellingServicesOutcome = getCounsellingServicesOutcome;
const createCounsellingServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { eligibleForAVPCounsellingServices, receivingCrisisCounselling, scheduledIntakeApptForIndividualTherapy, intakeAppointmentOutcome, receivingIndividualTherapy, therapistName, addedToIndividualTherapyWaitlist, referredForCounsellingServices, counsellingAgency, sentAVPSupportGroupInfo, attendingSupportGroup, supportGroupName, addedToSupportGroupWaitlist, additionalNotes, } = req.body;
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
        const outcome = yield (0, referral_service_1.postCounsellingServicesOutcome)(id, eligibleForAVPCounsellingServices, receivingCrisisCounselling, scheduledIntakeApptForIndividualTherapy, intakeAppointmentOutcome, receivingIndividualTherapy, therapistName, addedToIndividualTherapyWaitlist, referredForCounsellingServices, counsellingAgency, sentAVPSupportGroupInfo, attendingSupportGroup, supportGroupName, addedToSupportGroupWaitlist, additionalNotes);
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to add counselling services outcome due to the following error: ${err}`));
    }
});
exports.createCounsellingServicesOutcome = createCounsellingServicesOutcome;
const updateCounsellingServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, eligibleForAVPCounsellingServices, receivingCrisisCounselling, scheduledIntakeApptForIndividualTherapy, intakeAppointmentOutcome, receivingIndividualTherapy, therapistName, addedToIndividualTherapyWaitlist, referredForCounsellingServices, counsellingAgency, sentAVPSupportGroupInfo, attendingSupportGroup, supportGroupName, addedToSupportGroupWaitlist, additionalNotes, } = req.body;
    try {
        const outcome = yield (0, referral_service_1.putCounsellingServicesOutcome)(id, eligibleForAVPCounsellingServices, receivingCrisisCounselling, scheduledIntakeApptForIndividualTherapy, intakeAppointmentOutcome, receivingIndividualTherapy, therapistName, addedToIndividualTherapyWaitlist, referredForCounsellingServices, counsellingAgency, sentAVPSupportGroupInfo, attendingSupportGroup, supportGroupName, addedToSupportGroupWaitlist, additionalNotes);
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to add to communication history due to the following error: ${err}`));
    }
});
exports.updateCounsellingServicesOutcome = updateCounsellingServicesOutcome;
const getYouthServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { id } = req.params;
    try {
        const outcome = (_f = (yield (0, referral_service_1.getReferralById)(id))) === null || _f === void 0 ? void 0 : _f.youthServicesOutcome;
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get referral by id due to the following error: ${err}`));
    }
});
exports.getYouthServicesOutcome = getYouthServicesOutcome;
const createYouthServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { eligibleForYVOServices, assignedToYVOTherapist, yvoStaffName, addedToYVOIndividualTherapyWaitlist, assignedToYVOGroup, addedToYVOGroupWaitlist, additionalNotes, } = req.body;
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
        const outcome = yield (0, referral_service_1.postYouthServicesOutcome)(id, eligibleForYVOServices, assignedToYVOTherapist, yvoStaffName, addedToYVOIndividualTherapyWaitlist, assignedToYVOGroup, addedToYVOGroupWaitlist, additionalNotes);
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to add to communication history due to the following error: ${err}`));
    }
});
exports.createYouthServicesOutcome = createYouthServicesOutcome;
const updateYouthServicesOutcome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, eligibleForYVOServices, assignedToYVOTherapist, yvoStaffName, addedToYVOIndividualTherapyWaitlist, assignedToYVOGroup, addedToYVOGroupWaitlist, additionalNotes, } = req.body;
    try {
        const outcome = yield (0, referral_service_1.putYouthServicesOutcome)(id, eligibleForYVOServices, assignedToYVOTherapist, yvoStaffName, addedToYVOIndividualTherapyWaitlist, assignedToYVOGroup, addedToYVOGroupWaitlist, additionalNotes);
        res.status(statusCode_1.default.OK).json(outcome);
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to add to communication history due to the following error: ${err}`));
    }
});
exports.updateYouthServicesOutcome = updateYouthServicesOutcome;
const createRefferalPDF = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.referral_id;
        if (req.file &&
            req.file.buffer &&
            req.file.mimetype &&
            req.file.originalname) {
            const name = req.file.originalname;
            const content = req.file.buffer;
            const type = req.file.mimetype;
            const key = (0, uuid_1.v4)();
            (0, referral_service_1.putReferralFileName)(id, name, key, type);
            yield awsUpload(key, content, type);
        }
        res.status(statusCode_1.default.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to upload file due to the following error: ${err}`));
    }
});
exports.createRefferalPDF = createRefferalPDF;
const getReferralFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.params.file_key;
        const resp = yield awsGet(key);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="filename.ext"');
        res.send(resp.Body);
        // res.status(StatusCode.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get file due to the following error: ${err}`));
    }
});
exports.getReferralFile = getReferralFile;
const deleteReferralFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        (0, referral_service_1.deleteReferralFileById)(id);
        res.status(statusCode_1.default.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to delete file due to the following error: ${err}`));
    }
});
exports.deleteReferralFile = deleteReferralFile;
const createFollowUpPDF = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.referral_id;
        if (req.file &&
            req.file.buffer &&
            req.file.mimetype &&
            req.file.originalname) {
            const name = req.file.originalname;
            const content = req.file.buffer;
            const type = req.file.mimetype;
            const key = (0, uuid_1.v4)();
            (0, referral_service_1.putFollowUpFileName)(id, name, key, type);
            yield awsUpload(key, content, type);
        }
        res.status(statusCode_1.default.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to upload file due to the following error: ${err}`));
    }
});
exports.createFollowUpPDF = createFollowUpPDF;
const getFollowUpFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.params.file_key;
        const resp = yield awsGet(key);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="filename.ext"');
        res.send(resp.Body);
        // res.status(StatusCode.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get file due to the following error: ${err}`));
    }
});
exports.getFollowUpFile = getFollowUpFile;
const deleteFollowUpFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        (0, referral_service_1.deleteFollowUpFileById)(id);
        res.status(statusCode_1.default.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to delete file due to the following error: ${err}`));
    }
});
exports.deleteFollowUpFile = deleteFollowUpFile;
const createOutreachPDF = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.referral_id;
        if (req.file &&
            req.file.buffer &&
            req.file.mimetype &&
            req.file.originalname) {
            const name = req.file.originalname;
            const content = req.file.buffer;
            const type = req.file.mimetype;
            const key = (0, uuid_1.v4)();
            (0, referral_service_1.putOutreachFileName)(id, name, key, type);
            yield awsUpload(key, content, type);
        }
        res.status(statusCode_1.default.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to upload file due to the following error: ${err}`));
    }
});
exports.createOutreachPDF = createOutreachPDF;
const getOutreachFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.params.file_key;
        const resp = yield awsGet(key);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="filename.ext"');
        res.send(resp.Body);
        // res.status(StatusCode.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to get file due to the following error: ${err}`));
    }
});
exports.getOutreachFile = getOutreachFile;
const deleteOutreachFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        (0, referral_service_1.deleteOutreachFileById)(id);
        res.status(statusCode_1.default.OK).json('success');
    }
    catch (err) {
        next(apiError_1.default.internal(`Unable to delete file due to the following error: ${err}`));
    }
});
exports.deleteOutreachFile = deleteOutreachFile;
//# sourceMappingURL=referral.controller.js.map