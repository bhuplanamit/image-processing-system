const express = require('express');
const { triggerWebhook } = require('../component/webhook.component');

const router = express.Router();

router.get('/trigger', triggerWebhook);

module.exports = router;