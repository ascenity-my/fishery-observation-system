const express = require('express');
const router = express.Router();

const controller = require('../../controllers/device.controller');

router.get('/list', controller.getAll);
router.get('/data', controller.getData);
router.get('/data/time-range', controller.getDataInTimeRange);
router.get('/data/average', controller.getAverage);
router.get('/data/average/hourly', controller.getLatestAverages);
router.get('/data/average/hourly/all', controller.getAllLatestAverages);
router.get('/data/average/all', controller.getOverallAverage);
router.get('/data/highest/all', controller.getHighest);
router.get('/data/highest/all/hourly', controller.getHighestAllHourly);
router.get('/data/bounds/all/hourly', controller.getBoundsAllHourly);

module.exports =    router;