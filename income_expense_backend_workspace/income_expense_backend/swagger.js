const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Income/Expense Tracker API',
      version: '1.0.0',
      description: 'REST API for managing income and expense transactions with balance tracking',
    },
    tags: [
      {
        name: 'Transactions',
        description: 'Transaction management endpoints'
      },
      {
        name: 'Summary',
        description: 'Balance and summary endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
