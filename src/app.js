const express = require('express');
const sequelize = require('./config/db.config');
const uploadRouter = require('./routes/upload.route');
const statusRouter = require('./routes/status.route');
const {errorHandler} = require('./middlewares/error.middleware');
const logger = require('./utils/logger');
const swaggerDocs = require('../swagger');
require('./model/relationship');
const webhookRoutes = require('./routes/webhook.route');


const app = express();
const port = process.env.PORT || 3000;
const swaggerPort = process.env.SWAGGER_PORT || 3001;

app.use(express.json());
app.use('/upload', uploadRouter);
app.use('/status', statusRouter);
app.use('/webhook', webhookRoutes);
app.use(errorHandler);


swaggerDocs(app, swaggerPort);

app.listen(port, async () => {
  logger.info(`Server running on port ${port}`);
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
});