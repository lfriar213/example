import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const FileEncryptor = ({ file }) => {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptedData, setEncryptedData] = useState(null);

  const encryptFile = () => {
    setIsEncrypting(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
      const fileData = new Uint8Array(reader.result);
      const blockSize = 16384; // 16KB
      const numBlocks = Math.ceil(fileData.length / blockSize);
      const encryptedBlocks = [];
      for (let i = 0; i < numBlocks; i++) {
        const start = i * blockSize;
        const end = Math.min(start + blockSize, fileData.length);
        const block = fileData.slice(start, end);
        const encryptedBlock = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.stringify(block), "secret key 123").toString();
        encryptedBlocks.push(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encryptedBlock)));
      }
      const encryptedData = encryptedBlocks.join('');
      setEncryptedData(JSON.stringify({data: encryptedData, fileName: file.name}));
      setIsEncrypting(false);
    };
  };

  useEffect(() => {
    if (file) {
      encryptFile();
    }
  }, [file]);

  useEffect(() => {
    if (encryptedData) {
      const dataBlob = new Blob([encryptedData], { type: 'application/json' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(dataBlob);
      downloadLink.download = `encrypted_${file.name}.json`;
      downloadLink.click();
    }
  }, [encryptedData, file]);

  return (
    <>
      {isEncrypting ? (
        <p>Encrypting...</p>
      ) : encryptedData ? (
        <p>Download will start automatically...</p>
      ) : null}
    </>
  );
};

export default FileEncryptor;
