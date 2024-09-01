const { v4: uuidv4 } = require('uuid');
const csv = require('csv-parser');
const logger = require('../utils/logger');
const { handleUpload } = require('../service/request.service');
const config = require('../config/webhook.config');

async function uploadCsv(req, res,next) {
    const results = [];
    const webhookUrl = config.webhookUrl;

    // Generate a unique requestId
    const requestId = uuidv4();

    // Send the requestId immediately to the client
    res.status(202).json({ requestId });
    logger.info(`Request received, requestId: ${requestId}`);

    // Spawn a background task to process the CSV
    process.nextTick(async () => {
        try {
            const bufferStream = req.file.buffer.toString('utf-8');
            const csvStream = require('stream').Readable.from(bufferStream);
            csvStream.pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    try {
                        await handleUpload(results, webhookUrl, requestId); // Pass the requestId to handleUpload
                        logger.info(`Upload successful, requestId: ${requestId}`);
                    } catch (error) {
                        next(error);
                        logger.error(`Upload failed for requestId ${requestId}: ${error}`);
                    }
                });
        } catch (error) {
            next(error)
            logger.error(`Failed to process requestId ${requestId}: ${error}`);
        }
    });
}

module.exports = { uploadCsv };
