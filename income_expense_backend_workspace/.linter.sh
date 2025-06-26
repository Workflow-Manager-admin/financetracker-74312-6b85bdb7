#!/bin/bash
cd /home/kavia/workspace/code-generation/financetracker-74312-6b85bdb7/income_expense_backend_workspace/income_expense_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

