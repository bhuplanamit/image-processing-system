const express = require('express');
const multer = require('multer');
const { uploadCsv } = require('../component/upload.component');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /uploadRoute:
 *   post:
 *     summary: Upload a CSV file
 *     description: Accepts a CSV file for processing.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The CSV file to uploadRoute
 *         required: true
 *     responses:
 *       200:
 *         description: File uploaded and processed successfully
 *       400:
 *         description: Invalid file format or other error
 *       500:
 *         description: Internal server error
 */
router.post('/', upload.single('file'), uploadCsv);

module.exports = router;