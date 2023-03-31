import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import './App.css';
import FileInput from './FileInput';
import FileEncryptor from './FileEncryptor';
import CryptoJS from 'crypto-js';
import './styles.css';


function App() {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [encryptedFileName, setEncryptedFileName] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <FileInput />
        {file && <FileEncryptor file={file} />}
      </header>
    </div>
  );
}

export default App;
