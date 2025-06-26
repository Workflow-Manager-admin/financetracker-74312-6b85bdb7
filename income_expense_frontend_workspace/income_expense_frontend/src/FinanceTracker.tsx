import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Types based on the backend API
interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
}

interface TransactionInput {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date?: string;
}

interface BalanceSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
}

const API_BASE_URL = 'https://vscode-internal-22879-beta.beta01.cloud.kavia.ai:3001';

const FinanceTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<BalanceSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactionCount: 0
  });
  const [formData, setFormData] = useState<TransactionInput>({
    type: 'income',
    amount: 0,
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/transactions`);
      if (response.data.status === 'success') {
        setTransactions(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch balance summary
  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/summary`);
      if (response.data.status === 'success') {
        setSummary(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch summary');
      console.error('Error fetching summary:', err);
    }
  };

  // Add new transaction
  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || formData.amount <= 0) {
      setError('Please fill in all fields with valid values');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/transactions`, formData);
      if (response.data.status === 'success') {
        setFormData({ type: 'income', amount: 0, description: '' });
        await fetchTransactions();
        await fetchSummary();
        setError(null);
      }
    } catch (err) {
      setError('Failed to add transaction');
      console.error('Error adding transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_BASE_URL}/transactions/${id}`);
      if (response.data.status === 'success') {
        await fetchTransactions();
        await fetchSummary();
      }
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error deleting transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'SF Pro Text, Helvetica, Arial, sans-serif',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    minHeight: '100vh'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#356aff'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#2d2d2d',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  };

  const formStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr auto',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: '#3a3a3a',
    color: '#ffffff',
    fontSize: '14px'
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#356aff',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#ff7b54',
    padding: '8px 16px',
    fontSize: '12px'
  };

  const summaryGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  };

  const summaryItemStyle: React.CSSProperties = {
    ...cardStyle,
    textAlign: 'center',
    padding: '15px'
  };

  const transactionListStyle: React.CSSProperties = {
    display: 'grid',
    gap: '10px'
  };

  const transactionItemStyle: React.CSSProperties = {
    ...cardStyle,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px'
  };

  const incomeColor = '#43d673';
  const expenseColor = '#ff7b54';

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Finance Tracker</h1>
      
      {error && (
        <div style={{
          ...cardStyle,
          backgroundColor: '#ff4444',
          color: 'white',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {/* Add Transaction Form */}
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '20px', color: '#356aff' }}>Add Transaction</h2>
        <form onSubmit={addTransaction} style={formStyle}>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
            style={selectStyle}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Amount"
            value={formData.amount || ''}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
            style={inputStyle}
            required
          />
          
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={inputStyle}
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              backgroundColor: loading ? '#666' : '#356aff'
            }}
          >
            {loading ? 'Adding...' : 'Add Transaction'}
          </button>
        </form>
      </div>

      {/* Balance Summary */}
      <div style={summaryGridStyle}>
        <div style={summaryItemStyle}>
          <h3 style={{ color: incomeColor, margin: '0 0 10px 0' }}>Total Income</h3>
          <p style={{ fontSize: '24px', margin: 0, fontWeight: 'bold' }}>
            ${summary.totalIncome.toFixed(2)}
          </p>
        </div>
        
        <div style={summaryItemStyle}>
          <h3 style={{ color: expenseColor, margin: '0 0 10px 0' }}>Total Expenses</h3>
          <p style={{ fontSize: '24px', margin: 0, fontWeight: 'bold' }}>
            ${summary.totalExpenses.toFixed(2)}
          </p>
        </div>
        
        <div style={summaryItemStyle}>
          <h3 style={{ color: summary.balance >= 0 ? incomeColor : expenseColor, margin: '0 0 10px 0' }}>
            Net Balance
          </h3>
          <p style={{ 
            fontSize: '24px', 
            margin: 0, 
            fontWeight: 'bold',
            color: summary.balance >= 0 ? incomeColor : expenseColor
          }}>
            ${summary.balance.toFixed(2)}
          </p>
        </div>
        
        <div style={summaryItemStyle}>
          <h3 style={{ color: '#356aff', margin: '0 0 10px 0' }}>Total Transactions</h3>
          <p style={{ fontSize: '24px', margin: 0, fontWeight: 'bold' }}>
            {summary.transactionCount}
          </p>
        </div>
      </div>

      {/* Transaction List */}
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '20px', color: '#356aff' }}>Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
            No transactions yet. Add your first transaction above!
          </p>
        ) : (
          <div style={transactionListStyle}>
            {transactions.map((transaction) => (
              <div key={transaction.id} style={transactionItemStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: transaction.type === 'income' ? incomeColor : expenseColor
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      {transaction.description}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                      {new Date(transaction.date).toLocaleDateString()} - {transaction.type}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: transaction.type === 'income' ? incomeColor : expenseColor
                    }}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    disabled={loading}
                    style={{
                      ...deleteButtonStyle,
                      backgroundColor: loading ? '#666' : expenseColor
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceTracker;
