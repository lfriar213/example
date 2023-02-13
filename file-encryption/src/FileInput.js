import React, { useState } from 'react';
const FileInput = () => {
    const [file, setFile] = useState(null);
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        {file && <p>{file.name}</p>}
      </div>
    );
  };
  export default FileInput;