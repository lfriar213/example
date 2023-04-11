import React, { useState } from 'react';
import PasswordPrompt from './PasswordPrompt';
import CryptoJS from 'crypto-js';

function FileDecryptor({ file }) {
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const handleDecryptClick = () => {
    setShowPasswordPrompt(true);
  };

  const handleDecrypt = (password) => {
    const bytes = CryptoJS.AES.decrypt(file, password);
    const decryptedFile = bytes.toString(CryptoJS.enc.Utf8);
    setDecryptedFile(decryptedFile);
    setShowPasswordPrompt(false);
  };

  return (
    <>
      <button onClick={handleDecryptClick}>Decrypt</button>
      {decryptedFile && (
        <div>
          <h3>Decrypted file:</h3>
          <p>{decryptedFile}</p>
        </div>
      )}
      {showPasswordPrompt && <PasswordPrompt onDecrypt={handleDecrypt} />}
    </>
  );
}

export default FileDecryptor;
