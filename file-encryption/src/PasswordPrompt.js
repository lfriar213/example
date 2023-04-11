import React, { useState } from 'react';

function PasswordPrompt({ onDecrypt }) {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDecryptClick = () => {
    onDecrypt(password);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter password to decrypt file</h2>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button onClick={handleDecryptClick}>Decrypt</button>
      </div>
    </div>
  );
}

export default PasswordPrompt;
