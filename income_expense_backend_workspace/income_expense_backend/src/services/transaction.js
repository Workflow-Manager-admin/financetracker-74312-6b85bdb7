class TransactionService {
  constructor() {
    this.transactions = [];
    this.nextId = 1;
  }

  // PUBLIC_INTERFACE
  /**
   * Add a new transaction
   * @param {Object} transactionData - Transaction data
   * @param {string} transactionData.type - Type of transaction (income/expense)
   * @param {number} transactionData.amount - Amount of transaction
   * @param {string} transactionData.description - Description of transaction
   * @param {string} transactionData.date - Date of transaction
   * @returns {Object} Created transaction
   */
  addTransaction(transactionData) {
    const transaction = {
      id: this.nextId++,
      type: transactionData.type,
      amount: parseFloat(transactionData.amount),
      description: transactionData.description,
      date: transactionData.date || new Date().toISOString()
    };
    
    this.transactions.push(transaction);
    return transaction;
  }

  // PUBLIC_INTERFACE
  /**
   * Get all transactions
   * @returns {Array} List of all transactions
   */
  getAllTransactions() {
    return this.transactions;
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a transaction by ID
   * @param {number} id - Transaction ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteTransaction(id) {
    const index = this.transactions.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
      this.transactions.splice(index, 1);
      return true;
    }
    return false;
  }

  // PUBLIC_INTERFACE
  /**
   * Calculate balance summary
   * @returns {Object} Balance summary with totals
   */
  getBalanceSummary() {
    const summary = {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      transactionCount: this.transactions.length
    };

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        summary.totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        summary.totalExpenses += transaction.amount;
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpenses;
    
    return summary;
  }
}

module.exports = new TransactionService();
