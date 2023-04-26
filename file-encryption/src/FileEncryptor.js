import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Select, MenuItem } from "@material-ui/core";

const FileEncryptor = ({ file }) => {
  const [isEncrypting, setIsEncrypting] = useState(false);  // state to track if encryption is in progress
  const [encryptedData, setEncryptedData] = useState(null);  // state to hold encrypted data
  const [secretKey, setSecretKey] = useState("");  // state to hold the secret key
  const [encryptionAlgorithm, setEncryptionAlgorithm] = useState("");  // state to hold encryption algorithm selected
  const [shouldEncrypt, setShouldEncrypt] = useState(false);  // state to trigger encryption on enter key press

  // event handler to trigger encryption on enter key press
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      setShouldEncrypt(true);
    }
  };

  // event handler to set encryption algorithm
  const handleAlgorithmChange = (event) => {
    setEncryptionAlgorithm(event.target.value);
  };

  // function to encrypt the file
  const encryptFile = () => {
    setIsEncrypting(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
          // Create a new Uint8Array from the result of the file reader
      const fileData = new Uint8Array(reader.result);

      // Set the block size to 16KB and calculate the number of blocks needed to encrypt the file
      const blockSize = 16384; // 16KB
      const numBlocks = Math.ceil(fileData.length / blockSize);

      // Initialize an array to hold the encrypted blocks
      const encryptedBlocks = [];

      // Loop through each block of the file and encrypt it
      for (let i = 0; i < numBlocks; i++) {
        // Determine the start and end indices of the current block
        const start = i * blockSize;
        const end = Math.min(start + blockSize, fileData.length);
        
        // Extract the current block from the file data
        const block = fileData.slice(start, end);

        // Encrypt the block using the specified encryption algorithm and secret key
        let encryptedBlock;
        if (encryptionAlgorithm === "blowfish") {
          encryptedBlock = CryptoJS.Blowfish.encrypt(CryptoJS.enc.Hex.stringify(block), secretKey).toString();
        } else if (encryptionAlgorithm === "triple-des") {
          encryptedBlock = CryptoJS.TripleDES.encrypt(CryptoJS.enc.Hex.stringify(block), secretKey).toString();
        } else {
          encryptedBlock = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.stringify(block), secretKey).toString();
        }

        // Add the encrypted block to the array of encrypted blocks
        encryptedBlocks.push(encryptedBlock);
      }

      const encryptedData = encryptedBlocks.join('');
      const encryptedBlob = new Blob([encryptedData], { type: file.type });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(encryptedBlob);
      downloadLink.download = `encrypted_${file.name}`;
      downloadLink.click();
      setEncryptedData(encryptedData);
      setIsEncrypting(false);
    };
  };

  useEffect(() => {
    if (shouldEncrypt && file && secretKey) {
      encryptFile();
      setShouldEncrypt(false);
    }
  }, [shouldEncrypt, file, secretKey, encryptionAlgorithm]);

  useEffect(() => {
    if (encryptedData) {
      const dataBlob = new Blob([encryptedData], { type: 'application/json' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(dataBlob);
      downloadLink.download = `${file.name}`;
      downloadLink.click();
    }
  }, [encryptedData, file]);

  return (
    <>
      <Select value={encryptionAlgorithm} onChange={handleAlgorithmChange}>
        <MenuItem value="aes">AES</MenuItem>
        <MenuItem value="blowfish">Blowfish</MenuItem>
        <MenuItem value="triple-des">Triple DES</MenuItem>`1  `
      </Select>
      <input type="text" placeholder="Enter secret key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} onKeyUp={handleKeyUp} />
      {isEncrypting ? (
        <p>Encrypting...</p>
      ) : encryptedData ? (
        <p>Download will start automatically...</p>
      ) : null}
    </>
  );
};

export default FileEncryptor;
