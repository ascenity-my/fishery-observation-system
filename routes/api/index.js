const express = require('express');
const router = express.Router();

router.use('/device', require('./device.route'));

module.exports = router;