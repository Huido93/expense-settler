import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

function ExpenseList({ expenses, setExpenses }) {
  const { t } = useTranslation();  // Hook to get the translation function

  const [editingRow, setEditingRow] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  const handleEditClick = (index) => {
    setEditingRow(index);
    setEditedExpense(expenses[index]);
  };

  const handleSaveClick = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = editedExpense;
    setExpenses(updatedExpenses);
    setEditingRow(null);
  };

  const handleCancelClick = () => {
    setEditingRow(null);
  };

  const handleDeleteClick = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleChange = (e) => {
    setEditedExpense({
      ...editedExpense,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>{t('expenseList.payer')}</th>   
            <th>{t('expenseList.amount')}</th> 
            <th>{t('expenseList.description')}</th> 
            <th>{t('expenseList.actions')}</th> {/* Actions Column */}
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense, index) => (
              <tr key={index}>
                {editingRow === index ? (
                  <>
                    <td>
                      <FormControl
                        type="text"
                        name="paidBy"
                        value={editedExpense.paidBy}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="number"
                        name="amount"
                        value={editedExpense.amount || ''}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="text"
                        name="description"
                        value={editedExpense.description}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ cursor: 'pointer', marginRight:'5px'}}
                        className='text-success'
                        onClick={() => handleSaveClick(index)}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{ cursor: 'pointer', marginRight:'5px' }}
                        className='text-secondary'
                        onClick={handleCancelClick}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{expense.paidBy}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ cursor: 'pointer', marginRight: '5px' }}
                        className='text-secondary'
                        onClick={() => handleEditClick(index)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ cursor: 'pointer', marginRight: '5px' }}
                        className='text-danger'
                        onClick={() => handleDeleteClick(index)}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default ExpenseList;
