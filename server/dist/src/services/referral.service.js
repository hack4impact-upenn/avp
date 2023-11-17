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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOutreachFileById = exports.deleteFollowUpFileById = exports.deleteReferralFileById = exports.putOutreachFileName = exports.putFollowUpFileName = exports.putReferralFileName = exports.putYouthServicesOutcome = exports.putCounsellingServicesOutcome = exports.putVictimServicesOutcome = exports.postYouthServicesOutcome = exports.postCounsellingServicesOutcome = exports.postVictimServicesOutcome = exports.getDuplicateReferrals = exports.deleteCommunicationHistory = exports.updateCommunicationHistory = exports.addToCommunicationHistory = exports.updateReferralById = exports.getReferralById = exports.getAllDepartmentReferrals = exports.getAllReferrals = exports.createNewReferral = void 0;
const referral_model_1 = require("../models/referral.model");
const createNewReferral = (staffName, status, departmentInCharge, program, staffAssigned, therapistAssigned, isReferral, survivorName, serviceRequested, agencyThatReferred, agencyRepName, agencyRepEmail, agencyRepPhone, survivorGender, survivorRace, survivorDOB, survivorAge, survivorSchoolOrCommunitySite, survivorGrade, isGuardianResponsible, guardianName, guardianRelationship, guardianAddress, guardianPhone, guardianEmail, guardianPreferredContactMethod, survivorEmailAddress, survivorAddress, survivorPhoneNumber, survivorPreferredContactMethod, notesFromOrg, primaryLanguage, relationshipToVictim, crimeDCNum, crimeDistrict, crimeDate, crimeType, isGunViolence, homDecedent, homDateOfDeath, homType, homLocation, homAddress, homZipCode, homDecedentAge, homDecedentSex, homDecedentRace, homDecedentEthnicity, homFMVNum, homMEONum, homMNum, homCaseInformation, historyOfCommunication, victimServicesOutcome, counsellingServicesOutcome, youthServicesOutcome, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent, transferredToETO, incidentAddress, incidentAddressZip, incidentAddressCity, incidentAddressState, reportedToPolice) => __awaiter(void 0, void 0, void 0, function* () {
    const newReferral = new referral_model_1.Referral({
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
        incidentAddress,
        incidentAddressZip,
        incidentAddressCity,
        incidentAddressState,
        reportedToPolice,
    });
    const referral = yield newReferral.save();
    return referral;
});
exports.createNewReferral = createNewReferral;
const getAllReferrals = () => __awaiter(void 0, void 0, void 0, function* () {
    return referral_model_1.Referral.find().exec();
});
exports.getAllReferrals = getAllReferrals;
const getAllDepartmentReferrals = (department) => __awaiter(void 0, void 0, void 0, function* () {
    return referral_model_1.Referral.find({ departmentInCharge: department }).exec();
});
exports.getAllDepartmentReferrals = getAllDepartmentReferrals;
const getReferralById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return referral_model_1.Referral.findOne({ _id: id }).exec();
});
exports.getReferralById = getReferralById;
const updateReferralById = (id, status, departmentInCharge, program, staffAssigned, therapistAssigned, isReferral, survivorName, serviceRequested, agencyThatReferred, agencyRepName, agencyRepEmail, agencyRepPhone, survivorGender, survivorRace, survivorDOB, survivorAge, survivorSchoolOrCommunitySite, survivorGrade, survivorPreferredContactMethod, isGuardianResponsible, guardianName, guardianRelationship, guardianAddress, guardianPhone, guardianEmail, guardianPreferredContactMethod, survivorAddress, survivorEmailAddress, survivorPhoneNumber, notesFromOrg, primaryLanguage, relationshipToVictim, crimeDCNum, crimeDistrict, crimeDate, crimeType, isGunViolence, homDecedent, homDateOfDeath, homType, homLocation, homAddress, homZipCode, homDecedentAge, homDecedentSex, homDecedentRace, homDecedentEthnicity, homFMVNum, homMEONum, homMNum, homCaseInformation, historyOfCommunication, outreachLetterSent, transferredToCCWaitlist, followUpLetterSent, transferredToETO, victimServicesOutcome, counsellingServicesOutcome, youthServicesOutcome, reportedToPolice) => __awaiter(void 0, void 0, void 0, function* () {
    const updateQuery = {
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
        homDecedentSex,
        homDecedentRace,
        homDecedentEthnicity,
        homFMVNum,
        homMEONum,
        homMNum,
        homCaseInformation,
        historyOfCommunication,
        outreachLetterSent,
        transferredToCCWaitlist,
        followUpLetterSent,
        transferredToETO,
        victimServicesOutcome,
        counsellingServicesOutcome,
        youthServicesOutcome,
        reportedToPolice,
    };
    return referral_model_1.Referral.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
});
exports.updateReferralById = updateReferralById;
const addToCommunicationHistory = (id, dateOfCommunication, method, user, notes, didEstablishedContact, dateOfNextCommunication) => __awaiter(void 0, void 0, void 0, function* () {
    const newCommunicationItem = {
        dateOfCommunication,
        method,
        user,
        notes,
        didEstablishedContact,
        dateOfNextCommunication,
    };
    // if (!Referral.find({ historyOfCommunication: null }).exec())
    return referral_model_1.Referral.findByIdAndUpdate(id, {
        $push: { historyOfCommunication: newCommunicationItem },
    }, { new: true }).exec();
});
exports.addToCommunicationHistory = addToCommunicationHistory;
const updateCommunicationHistory = (id, index, dateOfCommunication, method, user, notes, didEstablishedContact, dateOfNextCommunication) => __awaiter(void 0, void 0, void 0, function* () {
    const newCommunicationItem = {
        dateOfCommunication,
        method,
        user,
        notes,
        didEstablishedContact,
        dateOfNextCommunication,
    };
    return referral_model_1.Referral.findByIdAndUpdate(id, {
        $set: {
            [`historyOfCommunication.${index}`]: newCommunicationItem,
        },
    }, { new: true }).exec();
});
exports.updateCommunicationHistory = updateCommunicationHistory;
const deleteCommunicationHistory = (id, index) => __awaiter(void 0, void 0, void 0, function* () {
    return referral_model_1.Referral.findByIdAndUpdate(id, [
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
    ], { new: true }).exec();
});
exports.deleteCommunicationHistory = deleteCommunicationHistory;
const getDuplicateReferrals = (phoneNumber, email) => __awaiter(void 0, void 0, void 0, function* () {
    let phoneNumberRegex = '';
    if (phoneNumber.length) {
        for (let i = 0; i < phoneNumber.length; i += 1) {
            if (phoneNumber[i] >= '0' && phoneNumber[i] <= '9') {
                phoneNumberRegex += `${phoneNumber[i]}\\D*`;
            }
        }
        phoneNumberRegex += '$';
    }
    return referral_model_1.Referral.find({
        $or: [
            { survivorEmailAddress: { $regex: email || '\\b\\B', $options: 'i' } },
            { survivorPhoneNumber: { $regex: phoneNumberRegex || '\\b\\B' } },
        ],
    });
});
exports.getDuplicateReferrals = getDuplicateReferrals;
const postVictimServicesOutcome = (id, eligibleForAVPVictimServices, sentVCAPInfotoClient, avpAdvocateAssistingWithVCAP, referredToOtherVSAgencyForVCAP, vsAgencyName, avpAdvocateProvidingCourtSupport, clientWorkingWithFMV, fmvNumber, referredToOtherAgencyForCourt, courtSupportAgencyName, avpAdvocateContactedADA, avpAdvocateContactedDetective, needsRelocationAssistance, relocationReferralWasSubmitted, referredToAgencyForOtherServices, otherAgencyNames, otherServices, additionalNotes) => __awaiter(void 0, void 0, void 0, function* () {
    const newVictimServicesOutcome = {
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
    return referral_model_1.Referral.findByIdAndUpdate(id, {
        victimServicesOutcome: newVictimServicesOutcome,
    }, { new: true }).exec();
});
exports.postVictimServicesOutcome = postVictimServicesOutcome;
const postCounsellingServicesOutcome = (id, eligibleForAVPCounsellingServices, receivingCrisisCounselling, scheduledIntakeApptForIndividualTherapy, intakeAppointmentOutcome, receivingIndividualTherapy, therapistName, addedToIndividualTherapyWaitlist, referredForCounsellingServices, counsellingAgency, sentAVPSupportGroupInfo, attendingSupportGroup, supportGroupName, addedToSupportGroupWaitlist, additionalNotes) => __awaiter(void 0, void 0, void 0, function* () {
    const newCounsellingServicesOutcome = {
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
    return referral_model_1.Referral.findByIdAndUpdate(id, {
        counsellingServicesOutcome: newCounsellingServicesOutcome,
    }, { new: true }).exec();
});
exports.postCounsellingServicesOutcome = postCounsellingServicesOutcome;
const postYouthServicesOutcome = (id, eligibleForYVOServices, assignedToYVOTherapist, yvoStaffName, addedToYVOIndividualTherapyWaitlist, assignedToYVOGroup, addedToYVOGroupWaitlist, additionalNotes) => __awaiter(void 0, void 0, void 0, function* () {
    const newYouthServicesOutcome = {
        eligibleForYVOServices,
        assignedToYVOTherapist,
        yvoStaffName,
        addedToYVOIndividualTherapyWaitlist,
        assignedToYVOGroup,
        addedToYVOGroupWaitlist,
        additionalNotes,
    };
    return referral_model_1.Referral.findByIdAndUpdate(id, {
        youthServicesOutcome: newYouthServicesOutcome,
    }, { new: true }).exec();
});
exports.postYouthServicesOutcome = postYouthServicesOutcome;
const putVictimServicesOutcome = (id, eligibleForAVPVictimServices, sentVCAPInfotoClient, avpAdvocateAssistingWithVCAP, referredToOtherVSAgencyForVCAP, vsAgencyName, avpAdvocateProvidingCourtSupport, clientWorkingWithFMV, fmvNumber, referredToOtherAgencyForCourt, courtSupportAgencyName, avpAdvocateContactedADA, avpAdvocateContactedDetective, needsRelocationAssistance, relocationReferralWasSubmitted, referredToAgencyForOtherServices, otherAgencyNames, otherServices, additionalNotes) => __awaiter(void 0, void 0, void 0, function* () {
    const newVictimServicesOutcome = {
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
    return referral_model_1.Referral.findByIdAndUpdate(id, { victimServicesOutcome: newVictimServicesOutcome }, { new: true }).exec();
});
exports.putVictimServicesOutcome = putVictimServicesOutcome;
const putCounsellingServicesOutcome = (id, eligibleForAVPCounsellingServices, receivingCrisisCounselling, scheduledIntakeApptForIndividualTherapy, intakeAppointmentOutcome, receivingIndividualTherapy, therapistName, addedToIndividualTherapyWaitlist, referredForCounsellingServices, counsellingAgency, sentAVPSupportGroupInfo, attendingSupportGroup, supportGroupName, addedToSupportGroupWaitlist, additionalNotes) => __awaiter(void 0, void 0, void 0, function* () {
    const newCounsellingServicesOutcome = {
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
    return referral_model_1.Referral.findByIdAndUpdate(id, {
        $set: { counsellingServicesOutcome: newCounsellingServicesOutcome },
    }, { new: true }).exec();
});
exports.putCounsellingServicesOutcome = putCounsellingServicesOutcome;
const putYouthServicesOutcome = (id, eligibleForYVOServices, assignedToYVOTherapist, yvoStaffName, addedToYVOIndividualTherapyWaitlist, assignedToYVOGroup, addedToYVOGroupWaitlist, additionalNotes) => __awaiter(void 0, void 0, void 0, function* () {
    const newYouthServicesOutcome = {
        eligibleForYVOServices,
        assignedToYVOTherapist,
        yvoStaffName,
        addedToYVOIndividualTherapyWaitlist,
        assignedToYVOGroup,
        addedToYVOGroupWaitlist,
        additionalNotes,
    };
    return referral_model_1.Referral.findByIdAndUpdate(id, {
        $set: { youthServicesOutcome: newYouthServicesOutcome },
    }, { new: true }).exec();
});
exports.putYouthServicesOutcome = putYouthServicesOutcome;
const putReferralFileName = (id, name, key, type) => __awaiter(void 0, void 0, void 0, function* () {
    const updateItem = {};
    const newReferralFileName = {
        name,
        key,
        type,
    };
    Object.entries(newReferralFileName).forEach(([k, value]) => {
        if (value !== undefined) {
            updateItem[`referralFile.${k}`] = value;
        }
    });
    yield referral_model_1.Referral.findByIdAndUpdate(id, {
        $set: {
            'referralFile.name': name,
            'referralFile.key': key,
            'referralFile.type': type,
        },
        new: true,
    });
});
exports.putReferralFileName = putReferralFileName;
const deleteReferralFileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield referral_model_1.Referral.findByIdAndUpdate(id, { $unset: { referralFile: 1 } });
});
exports.deleteReferralFileById = deleteReferralFileById;
const deleteFollowUpFileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield referral_model_1.Referral.findByIdAndUpdate(id, { $unset: { followUpLetterFile: 1 } });
});
exports.deleteFollowUpFileById = deleteFollowUpFileById;
const deleteOutreachFileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield referral_model_1.Referral.findByIdAndUpdate(id, { $unset: { outReachLetterFile: 1 } });
});
exports.deleteOutreachFileById = deleteOutreachFileById;
const putFollowUpFileName = (id, name, key, type) => __awaiter(void 0, void 0, void 0, function* () {
    const updateItem = {};
    const newFollowUpFileName = {
        name,
        key,
        type,
    };
    Object.entries(newFollowUpFileName).forEach(([k, value]) => {
        if (value !== undefined) {
            updateItem[`followUpLetterFile.${k}`] = value;
        }
    });
    yield referral_model_1.Referral.findByIdAndUpdate(id, {
        $set: {
            'followUpLetterFile.name': name,
            'followUpLetterFile.key': key,
            'followUpLetterFile.type': type,
        },
        new: true,
    });
});
exports.putFollowUpFileName = putFollowUpFileName;
const putOutreachFileName = (id, name, key, type) => __awaiter(void 0, void 0, void 0, function* () {
    const updateItem = {};
    const newOutreachFileName = {
        name,
        key,
        type,
    };
    Object.entries(newOutreachFileName).forEach(([k, value]) => {
        if (value !== undefined) {
            updateItem[`outReachLetterFile.${k}`] = value;
        }
    });
    yield referral_model_1.Referral.findByIdAndUpdate(id, {
        $set: {
            'outReachLetterFile.name': name,
            'outReachLetterFile.key': key,
            'outReachLetterFile.type': type,
        },
        new: true,
    });
});
exports.putOutreachFileName = putOutreachFileName;
//# sourceMappingURL=referral.service.js.map