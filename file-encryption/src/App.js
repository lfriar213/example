import logo from './logo.svg';
import './App.css';
import React, { useState , useEffect } from 'react';
import './App.css';
import FileInput from './FileInput';
import FileEncryptor from './FileEncryptor';
import CryptoJS from 'crypto-js';
import './styles.css';
import './App.scss';

function App() {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [encryptedFileName, setEncryptedFileName] = useState(null);
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderContent = () => (
    <>
      <div className="Parallax__content__heading">
        <h1 className="Parallax__content__heading__text">Example Application Name</h1>
        <h2 className="Parallax__content__heading__caption">
          Your personal all-in-one tool for file encryption
        </h2>
      </div>
      <div className="Parallax__content__cta">
        <p>
          <b>Example 1.</b> 
        </p>
        <p>
          <b>Empty</b> Example 2.
        </p>
        
      </div>
    </>
  );

  
  return (
    <section className= 'Parallax'>
    <div className="Parallax__background" style={{ transform: `translateY(-${offsetY * 0.5}px)` }}>
    <div
        //className="Parallax__background-triangles"
        //style={{ transform: `translateY(${offsetY * 0.8}px)` }}
      />
   <div className="Parallax__content">{renderContent()}</div>
  <div className="App-header">
    <FileInput />
    {file && <FileEncryptor file={file} />}
  </div>
</div>



    </section>
  );
}

export default App;
