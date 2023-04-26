import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const FileEncryptor = ({ file }) => {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptedData, setEncryptedData] = useState(null);
  const [password, setPassword] = useState("");
  const [shouldEncrypt, setShouldEncrypt] = useState(false);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      setShouldEncrypt(true);
    }
  };

  const encryptFile = () => {
    setIsEncrypting(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
      const fileData = new Uint8Array(reader.result);
      const blockSize = 16384; // 16KB
      const numBlocks = Math.ceil(fileData.length / blockSize);
      const encryptedBlocks = [];
      const salt = CryptoJS.lib.WordArray.random(128/8);
      const key = CryptoJS.PBKDF2(password, salt, { keySize: 256/32, iterations: 1000 });
      for (let i = 0; i < numBlocks; i++) {
        const start = i * blockSize;
        const end = Math.min(start + blockSize, fileData.length);
        const block = fileData.slice(start, end);
        const encryptedBlock = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.stringify(block), key, { iv: CryptoJS.lib.WordArray.random(128/8) }).toString();
        encryptedBlocks.push(salt.toString() + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encryptedBlock)));
      }
      const encryptedData = encryptedBlocks.join('');
      setEncryptedData(JSON.stringify({data: encryptedData, fileName: file.name}));
      setIsEncrypting(false);
    };
  };

  useEffect(() => {
    if (shouldEncrypt && file && password) {
      encryptFile();
      setShouldEncrypt(false);
    }
  }, [shouldEncrypt, file, password]);

  useEffect(() => {
    if (encryptedData) {
      const dataBlob = new Blob([encryptedData], { type: 'application/json' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(dataBlob);
      downloadLink.download = `${file.name}.enc`;
      downloadLink.click();
    }
  }, [encryptedData, file]);

  return (
    <>
      <input type="password" placeholder="Enter secret key" value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={handleKeyUp} />
      {isEncrypting ? (
        <p>Encrypting...</p>
      ) : encryptedData ? (
        <p>Download will start automatically...</p>
      ) : null}
    </>
  );
};

export default FileEncryptor;
