#!/bin/bash
cd /home/kavia/workspace/code-generation/financetracker-74312-6b85bdb7/income_expense_frontend_workspace/income_expense_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

