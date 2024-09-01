const ProcessingRequest = require('../model/processingRequest.model');
const logger = require('../utils/logger');
const { validate: uuidValidate } = require('uuid');

async function triggerWebhook(req, res) {
    const requestId = req.query.requestId;
    const requestIdStr = String(requestId);


    // Validate the requestId
    if (!requestId) {
        logger.error('Invalid or missing requestId in webhook request');
        return res.status(400).json({ error: 'Invalid or missing requestId' });
    }


    try {
        // Find the processing request in the database
        const processingRequest = await ProcessingRequest.findOne({ where: { requestId: requestIdStr } });

        if (!processingRequest) {
            logger.error(`Processing request not found for requestId: ${requestId}`);
            return res.status(404).json({ error: 'Processing request not found' });
        }

        logger.info(`Webhook triggered successfully for ${requestId}`);

        // Return the status and requestId to the user
        return res.status(200).json({
            requestId: processingRequest.requestId,
            status: processingRequest.status,
            message: 'Webhook status fetched successfully'
        });
    } catch (error) {
        logger.error(`Failed to trigger webhook for ${requestId}: ${error}`);
        return res.status(500).json({ error: 'Failed to fetch webhook status' });
    }
}

module.exports = { triggerWebhook };