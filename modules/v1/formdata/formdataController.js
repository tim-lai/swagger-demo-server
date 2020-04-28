'use strict';

const getFormdata = (req, res) => {
  return res.status(200).json({ message: 'ok', data: 'ok' });
}

const postFormdata = (req, res) => {
  return res.status(200).json({ message: 'post received', data: 'post received'});
}

const formdataMethods = {
  getFormdata,
  postFormdata,
};

module.exports = formdataMethods;
