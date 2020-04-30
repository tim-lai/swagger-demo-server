'use strict';

const getFormdata = (req, res) => {
  console.log('getFormdata, got req.query:', req.query);
  return res.status(200).json({ message: 'ok', data: 'ok' });
}

const postFormdata = (req, res) => {
  console.log('postFormdata, got req.body:', req.body);
  console.log('postFormdata, got req.form:', req.form);
  console.log('postFormdata, got req.file:', req.file);
  console.log('postFormdata, got req.files:', req.files);
  console.log('postFormdata, got req.headers:', req.headers);
  // console.log('postFormdata, got req:', req);
  const returnData = req.body; // if file/files, we'll return metadata inside req.file/req.files
  if (req.files&& req.files.length > 0) {
    returnData.files = req.files
  }
  if (req.file && req.file.length > 0) {
    returnData.file = req.file
  }
  return res.status(200).json({ message: 'post received', data: returnData});
}

const formdataMethods = {
  getFormdata,
  postFormdata,
};

module.exports = formdataMethods;
