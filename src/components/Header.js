import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header({ changeLanguage, language }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/expense-settler" className='mx-3'>{language === 'en' ? 'Expense Settler' : '비용 정산기'}</Navbar.Brand>
      <Nav className="ml-auto">
        <div className='d-flex'>
          <Button variant="outline-light" className='mx-2' onClick={() => changeLanguage('en')} disabled={language === 'en'}>
            English
          </Button>
          <Button variant="outline-light" className='mx-2' onClick={() => changeLanguage('ko')} disabled={language === 'ko'}>
            한국어
          </Button>
        </div>
        
      </Nav>
    </Navbar>
  );
}

export default Header;
