const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'food_backend_api',
            version: '1.0.0',
            description: 'API documentation for food delivery app.',
        },
    },
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
