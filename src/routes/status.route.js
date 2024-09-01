const express = require('express');
const { getStatus } = require('../component/status.component');

const router = express.Router();
/**
 * @swagger
 * /status/{requestId}:
 *   get:
 *     summary: Get the status of a processing request
 *     description: Returns the status and product details of a processing request based on the requestId.
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         description: The ID of the processing request
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestId:
 *                   type: string
 *                 status:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       serialNumber:
 *                         type: integer
 *                       productName:
 *                         type: string
 *                       inputUrls:
 *                         type: string
 *                       outputUrls:
 *                         type: string
 *       400:
 *         description: Invalid requestId supplied
 *       404:
 *         description: Request not found
 */

router.get('/:requestId', getStatus);

module.exports = router;