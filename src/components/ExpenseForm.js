import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Select from 'react-select/creatable';
import { useTranslation } from 'react-i18next';

function ExpenseForm({ addExpense, participants, setParticipants }) {
  const { t } = useTranslation(); 

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]); // State for beneficiaries
  const [selectAll, setSelectAll] = useState(false); // State for "Select All" checkbox

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setBeneficiaries(isChecked ? [...participants] : []);
  };

  const handleBeneficiaryChange = (e) => {
    const selected = e.target.value;
    const isChecked = e.target.checked;

    setBeneficiaries((prev) =>
      isChecked
        ? [...prev, selected] // Add beneficiary if checked
        : prev.filter((b) => b !== selected) // Remove beneficiary if unchecked
    );

    if (!isChecked) {
      setSelectAll(false); // Uncheck "Select All" if any individual is unchecked
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paidBy && beneficiaries.length > 0) {
      const selectedParticipant = paidBy.value;

      // Add participant if not already in the list
      if (!participants.includes(selectedParticipant)) {
        setParticipants([...participants, selectedParticipant]);
      }

      addExpense({ 
        description, 
        amount: parseFloat(amount), 
        paidBy: selectedParticipant, 
        beneficiaries 
      });

      setDescription('');
      setAmount('');
      setPaidBy(null);
      setBeneficiaries([]); // Reset beneficiaries after submitting
      setSelectAll(false); // Reset "Select All" checkbox
    } else {
      alert(t('expenseForm.selectBeneficiariesWarning'));
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
                <Select
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

          <Form.Group controlId="beneficiaries">
            <Form.Label>{t('expenseForm.beneficiaries')}</Form.Label>
            <Form.Check
              type="checkbox"
              label={t('expenseForm.selectAll')}
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
            {participants.map((participant, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={participant}
                value={participant}
                checked={beneficiaries.includes(participant)}
                onChange={handleBeneficiaryChange}
              />
            ))}
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
