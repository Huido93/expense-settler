import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function ExpenseList({ expenses }) {
  const { t } = useTranslation();  // Hook to get the translation function

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>{t('expenseList.payer')}</th>   
            <th>{t('expenseList.amount')}</th> 
            <th>{t('expenseList.description')}</th> 
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.paidBy}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default ExpenseList;
