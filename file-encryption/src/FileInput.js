import React, { useState } from 'react';
import FileEncryptor from './FileEncryptor';

const FileInput = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} max="100000000" />
      {file && <FileEncryptor file={file} />}
    </div>
  );
};

export default FileInput;