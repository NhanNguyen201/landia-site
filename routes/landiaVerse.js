const express = require('express');
const router = express.Router();
const landiaVerseController = require('../controller/landiaVerse')

router.get('/', landiaVerseController.getWorld)

module.exports = router