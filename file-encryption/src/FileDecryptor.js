import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function FileDecryptor({ file }) {
  // Declare state variables using the useState hook
  const [secretKey, setSecretKey] = useState('');
  const [decryptedData, setDecryptedData] = useState(null);
  const [decryptionError, setDecryptionError] = useState(null);

  // Define an event handler for the secret key input field
  const handleSecretKeyChange = (event) => {
    setSecretKey(event.target.value);
  };    

  // Define an event handler for the Decrypt button
  const handleDecryptClick = () => {
    try {
      // Use the CryptoJS library to decrypt the file with the provided secret key
      const bytes = CryptoJS.AES.decrypt(file, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      // Update state to store the decrypted data and clear any previous error message
      setDecryptedData(decryptedData);
      setDecryptionError(null);
    } catch (error) {
      // If decryption fails, set an error message and clear any previously decrypted data
      setDecryptionError('Incorrect key, please try again.');
      setDecryptedData(null);
    }
  };

  // Define an event handler for the Download Decrypted File button
  const handleDownloadClick = () => {
    // Create a new Blob object to represent the decrypted data
    const decryptedBlob = new Blob([decryptedData], { type: file.type });
    // Create a new download link element and simulate a click to download the decrypted data
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(decryptedBlob);
    downloadLink.download = file.name.replace('.enc', ''); // Remove the .enc extension from the original filename
    downloadLink.click();
  };

  // Render the decryption form with input fields, buttons, and error messages
  return (
    <div>
      <input type="text" placeholder="Enter secret key" value={secretKey} onChange={handleSecretKeyChange} />
      <button onClick={handleDecryptClick}>Decrypt</button>
      {decryptionError && <p>{decryptionError}</p>}
      {decryptedData && (
        <div>
          <p>Decryption successful.</p>
          <button onClick={handleDownloadClick}>Download Decrypted File</button>
        </div>
      )}
    </div>
  );
}

export default FileDecryptor;
