import React from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

function ShareButton({ summaryText }) {

    const { t } = useTranslation();

    const shareSummary = () => {
      if (window.Kakao) {
        window.Kakao.Link.sendDefault({
          objectType: 'text',
          text: summaryText,
          link: {
            mobileWebUrl: 'https://huido93.github.io/expense-settler',
            webUrl: 'https://huido93.github.io/expense-settler'
          }
        });
      }
    };
  
    return (
      <Button variant='warning' className='mb-3 mx-2' onClick={shareSummary}>
        {t('shareButton.kakaotalk')}
      </Button>
    );
  }

  export default ShareButton