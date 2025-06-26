const express = require('express');
const healthController = require('../controllers/health');
const transactionController = require('../controllers/transaction');

const router = express.Router();
// Health endpoint

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - type
 *         - amount
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated transaction ID
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *         amount:
 *           type: number
 *           minimum: 0.01
 *           description: Transaction amount
 *         description:
 *           type: string
 *           description: Transaction description
 *         date:
 *           type: string
 *           format: date-time
 *           description: Transaction date
 *     TransactionInput:
 *       type: object
 *       required:
 *         - type
 *         - amount
 *         - description
 *       properties:
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *         amount:
 *           type: number
 *           minimum: 0.01
 *           description: Transaction amount
 *         description:
 *           type: string
 *           description: Transaction description
 *         date:
 *           type: string
 *           format: date-time
 *           description: Transaction date (optional, defaults to current time)
 *     BalanceSummary:
 *       type: object
 *       properties:
 *         totalIncome:
 *           type: number
 *           description: Total income amount
 *         totalExpenses:
 *           type: number
 *           description: Total expenses amount
 *         balance:
 *           type: number
 *           description: Net balance (income - expenses)
 *         transactionCount:
 *           type: integer
 *           description: Total number of transactions
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of all transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Internal server error
 */
router.post('/transactions', transactionController.addTransaction.bind(transactionController));
router.get('/transactions', transactionController.getAllTransactions.bind(transactionController));

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       400:
 *         description: Invalid transaction ID
 *       500:
 *         description: Internal server error
 */
router.delete('/transactions/:id', transactionController.deleteTransaction.bind(transactionController));

/**
 * @swagger
 * /summary:
 *   get:
 *     summary: Get balance summary
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Balance summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/BalanceSummary'
 *       500:
 *         description: Internal server error
 */
router.get('/summary', transactionController.getBalanceSummary.bind(transactionController));

module.exports = router;
