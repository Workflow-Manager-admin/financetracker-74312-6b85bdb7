const transactionService = require('../services/transaction');

class TransactionController {
  // PUBLIC_INTERFACE
  /**
   * Add a new transaction
   */
  addTransaction(req, res) {
    try {
      const { type, amount, description, date } = req.body;

      // Validate required fields
      if (!type || !amount || !description) {
        return res.status(400).json({
          status: 'error',
          message: 'Type, amount, and description are required'
        });
      }

      // Validate transaction type
      if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({
          status: 'error',
          message: 'Type must be either "income" or "expense"'
        });
      }

      // Validate amount
      if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Amount must be a positive number'
        });
      }

      const transaction = transactionService.addTransaction({
        type,
        amount,
        description,
        date
      });

      res.status(201).json({
        status: 'success',
        data: transaction
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to add transaction'
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get all transactions
   */
  getAllTransactions(req, res) {
    try {
      const transactions = transactionService.getAllTransactions();
      res.status(200).json({
        status: 'success',
        data: transactions
      });
    } catch (error) {
      console.error('Error getting transactions:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve transactions'
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a transaction by ID
   */
  deleteTransaction(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          status: 'error',
          message: 'Valid transaction ID is required'
        });
      }

      const deleted = transactionService.deleteTransaction(id);

      if (!deleted) {
        return res.status(404).json({
          status: 'error',
          message: 'Transaction not found'
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Transaction deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete transaction'
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get balance summary
   */
  getBalanceSummary(req, res) {
    try {
      const summary = transactionService.getBalanceSummary();
      res.status(200).json({
        status: 'success',
        data: summary
      });
    } catch (error) {
      console.error('Error getting balance summary:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve balance summary'
      });
    }
  }
}

module.exports = new TransactionController();
