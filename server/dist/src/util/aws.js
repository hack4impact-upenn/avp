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
const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env;
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECTRET_ACCESS_KEY,
});
const awsUpload = (key, body, contentType) => {
    AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });
    const s3Bucket = new AWS.S3({
        params: { Bucket: process.env.AWS_BUCKET_NAME },
    });
    const params = {
        Key: key,
        Body: body,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: contentType,
    };
    s3Bucket.putObject(params, function (err, data) {
        if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
        }
        else {
            console.log('Successfully uploaded the file!');
        }
    });
};
const awsGet = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    };
    const val = yield s3.getObject(params).promise();
    return val;
});
const aws = { awsUpload, awsGet };
exports.default = aws;
//# sourceMappingURL=aws.js.map