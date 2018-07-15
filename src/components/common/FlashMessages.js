import React from 'react';
import Flash from '../../lib/Flash';

const FlashMessages = () => {
  const messages = Flash.getMessages();
  Flash.clearMessages();

  return (
    <div>
      {messages && Object.keys(messages).map(type =>
        <div key={type} className={`notification is-${type} flash-message`}>{messages[type]}</div>
      )}
    </div>
  );
};

export default FlashMessages;
