const ProcessingRequest = require('../model/processingRequest.model');
const Product = require('../model/product.model');
const imageProcessingService = require('./imageProcessing.service');
const logger = require('../utils/logger');
const axios = require('axios');
const ErrorHandler = require('../middlewares/error.middleware')
const e = require("express");
const {error} = require("winston");
const {BadRequestError, NotFoundError} = require("../middlewares/error.middleware");

async function validateAndResolveUrls(urls) {
    const validUrls = [];

    for (let url of urls) {
        try {
            url = String(url).trim().replace(/(\r\n|\n|\r)/gm, "");

            // Validate the URL format
            if (!/^https?:\/\/[^\s$.?#].\S*$/gm.test(url)) {
                logger.error(`Invalid URL format: ${url}`);
                continue;  // Skip this URL and move to the next one
            }

            // Attempt to resolve the URL with a HEAD request
            await axios.head(url);
            validUrls.push(url);  // Add to the list if the URL is resolvable
            logger.info(`URL is resolvable: ${url}`);
        } catch (error) {
            errorHandler(error)
            logger.error(`URL could not be resolved or is invalid: ${url}, Error: ${error.message}`);
        }
    }

    return validUrls;
}


async function handleUpload(csvData, webhookUrl, requestId) {
    logger.info(`Handling upload for requestId: ${requestId}`);

    // Validate requestId
    if (!requestId) {
        const error = `Invalid requestId: ${requestId}`;
        logger.error(error);
        throw new BadRequestError;
    }

    // Validate webhookUrl
    if (webhookUrl && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(webhookUrl)) {
        const error = `Invalid webhookUrl: ${webhookUrl}`;
        logger.error(error);
        throw new BadRequestError;
    }

    try {
        const request = await ProcessingRequest.create({requestId, webhookUrl});
        logger.info(`Created ProcessingRequest with ID: ${requestId}`);

        for (const row of csvData) {
            logger.info(`Processing row: ${JSON.stringify(row)}`);

            // Validate the serial number and product name
            if (!row['S. No.'] || !row['Product Name']) {
                logger.error(`Missing required product information: ${JSON.stringify(row)}`);
                continue;  // Skip this row and move to the next one
            }

            // Validate and process inputUrls
            const inputUrls = row['Input Image Urls']
                .replace(/[\[\]]/g, '')  // Remove any brackets if they exist
                .split(';')  // Split the URLs using the semicolon separator
                .map(url => String(url).trim());  // Trim any extraneous whitespace

            // Resolve valid URLs
            const validUrls = await validateAndResolveUrls(inputUrls);
            if (validUrls.length === 0) {
                logger.error(`No valid URLs found in row: ${JSON.stringify(row)}`);
                continue;  // Skip this row if no valid URLs are found
            }

            const product = await Product.create({
                serialNumber: row['S. No.'],
                productName: row['Product Name'],
                inputUrls: JSON.stringify(validUrls),
                processingRequestId: request.requestId,
            });
            logger.info(`Created Product with ID: ${product.id}`);
            await imageProcessingService.processImages(product);
            logger.info(`Processing images for Product ID: ${product.id}`);
        }
        return requestId;
    } catch (error) {
        logger.error(`Upload handling failed: ${error}`);
        logger.error(error.stack);
        throw new Error('Internal Server Error');
    }
}

async function checkStatus(requestId) {
    logger.info(`Checking status for requestId: ${requestId}`)
    const request = await ProcessingRequest.findOne({
        where: {requestId},
        include: [{model: Product, as: 'products'}],
    });

    if (!request) {
        throw new NotFoundError('Status not found for the given Request ID');
    }

    return {
        status: request.status,
        products: request.products.map((product) => ({
            serialNumber: product.serialNumber,
            productName: product.productName,
            inputUrls: product.inputUrls,
            outputUrls: product.outputUrls,
        })),
    };
}

module.exports = {handleUpload, checkStatus};
