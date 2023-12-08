/// <reference types="node" />
declare const aws: {
  awsUpload: (key: string, body: Buffer, contentType: string) => void;
  awsGet: (key: string) => Promise<any>;
};
export default aws;
//# sourceMappingURL=aws.d.ts.map
