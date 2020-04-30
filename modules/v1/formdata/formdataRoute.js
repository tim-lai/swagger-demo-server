const express = require('express');
const formdataCtr = require('./formdataController');
const formdataMiddleware = require('./formdataMiddleware');
const formdataRouter = express.Router();

formdataRouter.get('/', formdataCtr.getFormdata);
formdataRouter.post('/', [formdataMiddleware.middlewareNext, formdataMiddleware.uploadFile], formdataCtr.postFormdata);

module.exports = { formdataRouter };