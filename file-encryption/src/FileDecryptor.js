import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function FileDecryptor({ file, secretKey }) {
  console.log("Secret key:", secretKey);
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleDecryptClick = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(file.data, CryptoJS.PBKDF2(secretKey, file.salt, { keySize: 256/32, iterations: 100 }));
      const decryptedFile = bytes.toString(CryptoJS.enc.Utf8);
      if (decryptedFile) {
        setDecryptedFile(decryptedFile);
        setError(null);
        console.log("Decryption successful");
      } else {
        setError("Incorrect Key, Please Try Again");
      }
    } catch (error) {
      setError("Incorrect Key, Please Try Again");
    }
  };

  const handleDownloadDecryptedFileClick = () => {
    const decryptedDataBlob = new Blob([decryptedFile], { type: file.type });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(decryptedDataBlob);
    downloadLink.download = file.fileName.replace('.enc', '');
    downloadLink.click();
  };

  return (
    <>
      <button onClick={handleDecryptClick}>Decrypt</button>
      {decryptedFile && (
        <div>
          <h3>Decrypted file:</h3>
          <p>{decryptedFile}</p>
          <button onClick={handleDownloadDecryptedFileClick}>Download Decrypted File</button>
        </div>
      )}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </>
  );
}

export default FileDecryptor;
