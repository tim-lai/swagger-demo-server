const multer = require('multer');
const path = require('path');
const tmpFileDir = process.env.TMP_FILE_DIR;

const middlewareNext = (req, res, next) => {
  // insert your middleware here
  next()
};

/**
 * Multer middleware section to handle file upload(s) 
 */
const uploadDirectoryPath = tmpFileDir;

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectoryPath);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const timestamp = `${Date.now()}${parseInt((Math.random() + 4) * 100)}`;
    const destinationFileName = `${file.fieldname}-${timestamp}${extension}`;
    cb(null, destinationFileName);
  }
});

const multerFileFilter = (req, file, cb) => {
  const type = file.mimetype;
  if (type === 'application/pdf'
    || type === 'application/json'
    || type === 'application/xml'
    || type === 'image/png'
    || type === 'image/jpeg'
    || type === 'image/gif'
    || type === 'image/tiff'
    || type === 'image/svg+xml'
    || type === 'text/plain'
    || type === 'text/csv'
    || type === 'text/html'
    || type === 'text/xml'
    || type === 'text/x-yaml'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

const uploadFile = multer({ storage: multerStorage, fileFilter: multerFileFilter }).any(); // todo: specify "any"


const formdataMiddleware = {
  middlewareNext,
  uploadFile
};

module.exports = formdataMiddleware;
