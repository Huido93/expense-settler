import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useTranslation } from 'react-i18next';

function ExpenseForm({ addExpense, participants, setParticipants }) {
  const { t } = useTranslation(); 

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paidBy) {
      const selectedParticipant = paidBy.value;

      // Add participant if not already in the list
      if (!participants.includes(selectedParticipant)) {
        setParticipants([...participants, selectedParticipant]);
      }

      addExpense({ description, amount: parseFloat(amount), paidBy: selectedParticipant });
      setDescription('');
      setAmount('');
      setPaidBy(null);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header>
        💸 {t('expenseForm.header')}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>   
        <Row>
            <Col sm={6}>
                <Form.Group controlId="paidBy">
                    <Form.Label>{t('expenseForm.paidBy')}</Form.Label>
                    <CreatableSelect
                    value={paidBy}
                    onChange={setPaidBy}
                    options={participants.map((p) => ({ label: p, value: p }))}
                    placeholder={t('expenseForm.paidByPlaceholder')}
                    isClearable
                    />
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group controlId="amount">
                    <Form.Label>{t('expenseForm.amount')}</Form.Label>
                    <Form.Control
                    type="number"
                    placeholder={t('expenseForm.amountPlaceholder')}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Group>
            </Col>
        </Row>
         

          <Form.Group controlId="description">
            <Form.Label>{t('expenseForm.description')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('expenseForm.descriptionPlaceholder')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" block className='mt-3 w-100'>
            {t('expenseForm.addExpense')}
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
}

export default ExpenseForm;
