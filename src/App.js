import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './i18n';  // Import i18n configuration
import Header from './components/Header';
import ParticipantInput from './components/ParticipantInput'; // New component for Phase 1
import ExpenseForm from './components/ExpenseForm';
import SettlementSummary from './components/SettlementSummary';

function App() {

  useEffect(() => {
    // Initialize Kakao SDK
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('877b5258147310dfd661a9ebea2e615f'); // My Kakao JavaScript Key
    }
  }, []);

  const { i18n } = useTranslation();
  const [phase, setPhase] = useState(1);  // Phase 1: Input participants, Phase 2: Input expenses
  const [expenses, setExpenses] = useState([]);
  const [participants, setParticipants] = useState([]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const startPhase2 = () => {
    if (participants.length > 0) {
      setPhase(2);
    } else {
      alert('Please add at least one participant');
    }
  };

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
  };

  const removeExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <Header changeLanguage={changeLanguage} language={i18n.language} />
      <Container>
        <Row className='mt-3'>
          {phase === 1 && (
            <Col md={12}>
              <ParticipantInput 
                participants={participants} 
                setParticipants={setParticipants} 
                startPhase2={startPhase2}  // Proceed to Phase 2
              />
            </Col>
          )}

          {phase === 2 && (
            <>
              <Col md={6}>
                <ExpenseForm
                  addExpense={addExpense}
                  participants={participants}
                />
              </Col>
              <Col md={6}>
                <SettlementSummary
                  expenses={expenses}
                  participants={participants}
                />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
