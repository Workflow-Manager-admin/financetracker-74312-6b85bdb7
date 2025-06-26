# Finance Tracker Frontend

A modern, responsive web application for tracking income and expenses with a dark theme UI.

## Features

- **Add Transactions**: Add income or expense entries with amount and description
- **View Transactions**: Display all transactions in a clean, organized list
- **Delete Transactions**: Remove individual transactions with a simple click
- **Balance Summary**: Real-time summary showing:
  - Total Income
  - Total Expenses
  - Net Balance
  - Transaction Count

## Design

- **Theme**: Dark theme with modern minimalistic design
- **Colors**: 
  - Primary: #356aff (blue)
  - Income: #43d673 (green)
  - Expense: #ff7b54 (orange/red)
- **Layout**: Responsive grid layout that works on desktop and mobile

## How to Access

### Method 1: Remotion Studio (Recommended)
1. The server is running at: http://localhost:3000
2. Open the URL in your browser
3. Select "FinanceTracker" from the composition list in the sidebar
4. The Finance Tracker will load in the preview area

### Method 2: Standalone HTML (Alternative)
1. Open `finance-tracker.html` directly in your browser
2. This provides a standalone version without Remotion

## API Integration

The frontend connects to the backend API at:
`https://vscode-internal-22879-beta.beta01.cloud.kavia.ai:3001`

### API Endpoints Used:
- `GET /transactions` - Fetch all transactions
- `POST /transactions` - Add new transaction
- `DELETE /transactions/:id` - Delete transaction by ID
- `GET /summary` - Get balance summary

## Development

### Commands:
- `npm start` - Start the development server
- `npm run lint` - Run linting and type checking
- `npm run build` - Build for production

### File Structure:
- `src/FinanceTracker.tsx` - Main Finance Tracker component
- `src/Root.tsx` - Remotion root with compositions
- `finance-tracker.html` - Standalone HTML version
- `src/standalone.tsx` - Standalone React entry point

## Usage Instructions

1. **Adding Transactions**:
   - Select transaction type (Income/Expense)
   - Enter amount (must be positive)
   - Add description
   - Click "Add Transaction"

2. **Viewing Balance**:
   - Summary cards show real-time totals
   - Green indicates positive values (income/profit)
   - Red/Orange indicates negative values (expenses/loss)

3. **Managing Transactions**:
   - All transactions appear in chronological order
   - Each transaction shows type, amount, description, and date
   - Click "Delete" to remove unwanted transactions

## Error Handling

The application includes comprehensive error handling:
- Network connectivity issues
- Invalid input validation
- Server response errors
- Loading states for better UX

## Browser Compatibility

Compatible with modern browsers that support:
- ES2018+ JavaScript features
- CSS Grid and Flexbox
- Fetch API or Axios HTTP client
