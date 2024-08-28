import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ParticipantInput({ participants, setParticipants, startPhase2 }) {
  const [newParticipant, setNewParticipant] = useState('');
  const { t } = useTranslation(); // Hook to use translations

  const addParticipant = () => {
    if (newParticipant && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
    }
  };

  const removeParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Header className="text-center">
          👥 {t('participantInput.addParticipants')}
        </Card.Header>
        <Card.Body>
          <Form.Group controlId="formNewParticipant">
            <Form.Control
              type="text"
              placeholder={t('participantInput.enterParticipantName')}
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
            />
          </Form.Group>
          
          {participants.length > 0 && (
            <ListGroup className="mt-3 mb-3">
              <h6>{t('participantInput.list')}</h6>
              {participants.map((participant, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  {participant}
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: 'pointer' }}
                    className='text-danger'
                    onClick={() => removeParticipant(index)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

              <Button className="mt-3 w-100" onClick={addParticipant} variant="secondary">
                {t('participantInput.addParticipantButton')}
              </Button>
              <Button variant="dark" className="mt-3 w-100" onClick={startPhase2}>
                {t('participantInput.proceedToExpensesButton')}
              </Button>

        </Card.Body>
      </Card>
    </div>
  );
}

export default ParticipantInput;
