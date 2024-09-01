const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routes = require('./src/routes/status.route');
const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Image Processing System API',
      version: '1.0.0',
      description: 'API documentation for the Image Processing System',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API route files
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use('/status', routes);
  app.use('/upload',routes)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;