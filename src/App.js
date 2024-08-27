import React, { useState, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './i18n';  // Import i18n configuration
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import SettlementSummary from './components/SettlementSummary';

function App() {

  useEffect(() => {
    // Initialize Kakao SDK
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('877b5258147310dfd661a9ebea2e615f'); // Replace with your actual JavaScript Key
    }
  }, []);

  const { i18n } = useTranslation();  
  const [expenses, setExpenses] = useState([]);
  const [participants, setParticipants] = useState([]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const updateParticipants = (updatedExpenses) => {
    // Create a new set of participants based on the remaining expenses
    const newParticipants = Array.from(new Set(updatedExpenses.map(expense => expense.paidBy)));
    setParticipants(newParticipants);
  };

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    updateParticipants(updatedExpenses);
    console.log(expenses)
  };

  const removeExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    updateParticipants(updatedExpenses);
  };

  return (
    <div>
      <Header changeLanguage={changeLanguage} language={i18n.language} />
      <Container>
        <Row className='mt-3'>
          <Col md={6}>
            <ExpenseForm
              addExpense={addExpense}
              participants={participants}
              setParticipants={setParticipants}
            />
          </Col>
          <Col md={6}>
          <SettlementSummary
              expenses={expenses}
              setExpenses={setExpenses}
              removeExpense={removeExpense}
              participants={participants}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
