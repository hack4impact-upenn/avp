import { postData } from '../util/api';

async function upload(input: File) {
  const formData = new FormData();
  formData.append('file', input);
  const res = await postData('referral/upload', formData);
  if (res.error) {
    throw Error(res.error.message);
  }
  return res.data;
}

export default upload;
