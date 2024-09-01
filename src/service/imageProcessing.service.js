const sharp = require('sharp');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const ProcessingRequest = require('../model/processingRequest.model');
const Product = require('../model/product.model');
const {BadRequestError} = require("../middlewares/error.middleware");

async function processImages(product) {
  const inputUrls = JSON.parse(product.inputUrls);
  logger.info(`Product inputUrls: ${product.inputUrls}`);
  const outputUrls = [];

  for (let url of inputUrls) {
    logger.info(`Processing URL: ${url}`);
    try {
      url = String(url).trim().replace(/(\r\n|\n|\r)/gm, "");

      // Validate the URL format
      if (!/^https?:\/\/[^\s$.?#].\S*$/gm.test(url)) {
        logger.error(`Invalid URL format: ${url}`);
        continue;  // Skip this URL and move to the next one
      }
      const response = await axios({ url: url, responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      const outputBuffer = await sharp(buffer)
          .resize({ width: Math.floor(500) })
          .toBuffer();
      outputUrls.push(url);
      logger.info(`Image processed successfully: ${url}`);
    } catch (error) {
      logger.error(`Error processing image: ${error}`);
    }
  }
  if (inputUrls.length !== outputUrls.length) {
    const error = `Mismatch in input and output URLs for product: ${product.productName}. Expected ${inputUrls.length}, but got ${outputUrls.length}.`;
    logger.error(error);
    throw new BadRequestError;
  }


  product.outputUrls = outputUrls.join(',');
  await product.save();

  logger.info(`Processing complete for product: ${product.productName}`);

  // Check if all products for this request are processed
  const allProducts = await Product.findAll({
    where: { processingRequestId: product.processingRequestId },
  });

  const allProcessed = allProducts.every(
      (prod) => prod.outputUrls !== null && JSON.parse(prod.inputUrls).length === prod.outputUrls.split(',').length
  );

  if (allProcessed) {
    const processingRequest = await ProcessingRequest.findByPk(
      product.processingRequestId
    );
    processingRequest.status = 'Completed';
    await processingRequest.save();

    if (processingRequest.webhookUrl) {
      try {
        const webhookUrl = `${processingRequest.webhookUrl}?requestId=${processingRequest.requestId}`;
        const webhookResponse = await axios.get(webhookUrl);
        logger.info(`Webhook triggered successfully for ${processingRequest.requestId}: ${webhookResponse.data.message}`);
      } catch (error) {
        logger.error(`Failed to trigger webhook for ${processingRequest.requestId}: ${error}`);
      }
    }
  }
}

module.exports = { processImages };