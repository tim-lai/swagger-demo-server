const express = require('express');
const path = require('path');

const router = express.Router();
const v = `../modules/${path.basename(__filename, '.js')}`;
const formdataRoutes = require(`${v}/formdata/formdataRoute`);

router.use('/', formdataRoutes.formdataRouter);

// Handle undefined routes
router.all('/*', (req, res) => {
  return res.status(404).json({
    error: 'URL not found'
  });
});

module.exports = router;
