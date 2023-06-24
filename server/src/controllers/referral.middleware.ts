import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
// upload.single('file')

export default upload;
