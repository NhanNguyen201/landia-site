const express = require('express');
const router = express.Router();
const sideImageHandler = require('../controller/sideImage')
const multer  = require('multer')
const upload = multer()
const mimeTypeMidleware = require('../helpers/midlewares/mimeTypeMidleware')
const bodyParser = require('body-parser')
// create application/json parser
const jsonParser = bodyParser.json()

router.get('/', (req, res) => {
    res.json({message: "Wellcome to sideImage route"})
})
router.post('/create', jsonParser, upload.single("image"), mimeTypeMidleware, sideImageHandler.createImage)
router.post('/check', jsonParser, sideImageHandler.checkBlock)

module.exports = router