import React from 'react';
import { ListGroup } from 'react-bootstrap';

function TransactionsList({ transactions }) {
  return (
    <ListGroup>
      {transactions.map((transaction, index) => (
        <ListGroup.Item key={index}>
          🤝 {transaction.from} owes {transaction.to} {transaction.amount}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TransactionsList;
