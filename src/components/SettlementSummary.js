import React from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ExpenseList from './ExpenseList';
import TransactionsList from './TransactionsList';  // Import the new TransactionsList component
import ShareButton from './ShareButton';

function calculateSettlement(expenses, participants) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const balances = participants.reduce((acc, participant) => {
    acc[participant] = 0;
    return acc;
  }, {});

  expenses.forEach((expense) => {
    const splitAmount = expense.amount / expense.beneficiaries.length; // Divide amount among beneficiaries

    expense.beneficiaries.forEach(beneficiary => {
      balances[beneficiary] -= splitAmount; // Subtract split amount from each beneficiary
    });

    balances[expense.paidBy] += expense.amount; // Add the full amount to the payer's balance
  });

  const transactions = [];
  const creditors = [];
  const debtors = [];

  for (let participant in balances) {
    if (balances[participant] > 0) {
      creditors.push({ participant, amount: balances[participant] });
    } else if (balances[participant] < 0) {
      debtors.push({ participant, amount: -balances[participant] });
    }
  }

  while (creditors.length > 0 && debtors.length > 0) {
    const creditor = creditors[0];
    const debtor = debtors[0];

    const minAmount = Math.min(creditor.amount, debtor.amount);

    transactions.push({
      from: debtor.participant,
      to: creditor.participant,
      amount: minAmount,  // Keep this as a number for now
    });

    creditor.amount -= minAmount;
    debtor.amount -= minAmount;

    if (creditor.amount === 0) creditors.splice(0, 1);
    if (debtor.amount === 0) debtors.splice(0, 1);
  }

  return { totalExpenses, transactions };
}

function formatCurrency(amount, currency) {
  const options = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };
  return amount.toLocaleString(undefined, options);  // Amount is expected to be a number
}

function SettlementSummary({ expenses, setExpenses, participants, removeExpense }) {
  const { t, i18n } = useTranslation();

  // Automatically set currency based on the language
  const currency = i18n.language === 'ko' ? 'KRW' : 'USD';

  if (participants.length === 0) return null;

  const { totalExpenses, transactions } = calculateSettlement(expenses, participants);

  // Create the summary text with translations and formatted currency
  const summaryText = `
  💰${t('settlementSummary.totalSpent')}: ${formatCurrency(totalExpenses, currency)}
  💰${t('settlementSummary.participants')}: ${participants.length}
  💰${t('settlementSummary.details')}:
    ${expenses.map(exp => `💸 ${exp.paidBy}: ${formatCurrency(exp.amount, currency)} ${t('settlementSummary.for')} ${exp.description}`).join('\n')}
  💰${t('settlementSummary.transactions')}:
    ${transactions.map(tx => `${tx.from} ${t('settlementSummary.owes')} ${tx.to} ${formatCurrency(tx.amount, currency)}`).join('\n')}
  `;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header className='settlement-header'>
        🧾 {t('settlementSummary.header')}
      </Card.Header>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <h6>💰 {t('settlementSummary.totalSpent')}: {formatCurrency(totalExpenses, currency)}</h6>
          <p>{t('settlementSummary.numParticipants')}: {participants.length}</p>
        </div>
        
        {/* Transactions List */}
        <h5 className="mt-4">💰 {t('settlementSummary.transactions')}</h5>
        {
          transactions.length > 0 ?
          <TransactionsList transactions={transactions.map(tx => ({
            ...tx,
            amount: formatCurrency(tx.amount, currency),  // Format amount here for display
          }))} /> : <p>{t('settlementSummary.noTransactionNeeded')}</p>
        }
        
        {/* Include the Expense List */}
        <h5 className="mt-4">💰 {t('settlementSummary.detailedExpenses')}</h5>
        <ExpenseList 
          expenses={expenses}
          setExpenses={setExpenses}
          removeExpense={removeExpense}
          formatCurrency={formatCurrency} />      
      </Card.Body>

      {/* <h6>Share the Summary:</h6> */}
      <ShareButton summaryText={summaryText} />

    </Card>
  );
}

export default SettlementSummary;
