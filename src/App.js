import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './i18n';  // Import i18n configuration
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import SettlementSummary from './components/SettlementSummary';

function App() {
  const { i18n } = useTranslation();  // No need to extract 't' here since it will be used in individual components
  const [expenses, setExpenses] = useState([]);
  const [participants, setParticipants] = useState([]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
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
            <SettlementSummary expenses={expenses} participants={participants} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
