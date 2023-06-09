const express = require('express');
const router = express.Router();
const convertDataController = require('../controllers/dataController');


router.post('/convert', convertDataController)

module.exports = router;