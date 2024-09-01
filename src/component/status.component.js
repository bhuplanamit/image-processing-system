const logger = require('../utils/logger');
const { checkStatus } = require('../service/request.service');

async function getStatus(req, res, next) {
  const { requestId } = req.params;

  try {
    const statusData = await checkStatus(requestId);
    res.json(statusData);
  } catch (error) {
    logger.error(`Status check failed: ${error}`);
    next(error)
  }
}

module.exports = { getStatus };