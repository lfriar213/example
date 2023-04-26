// Importing React and the useState hook from the React library
import React, { useState } from 'react';

// Importing two components, FileEncryptor and FilePasswordProtect
// that will be used conditionally based on the shouldEncrypt prop
import FileEncryptor from './FileEncryptor';
import FilePasswordProtect from './FilePasswordProtect';

// Creating a functional component named FileInput that takes a prop named shouldEncrypt
const FileInput = ({ shouldEncrypt }) => {
  
  // Creating a state variable named file using the useState hook
  const [file, setFile] = useState(null);

  // A function that sets the file state to the selected file when a file is selected
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // A div that contains an input element of type file that calls the handleFileChange function when a file is selected
  // and conditionally renders the FileEncryptor or FilePasswordProtect component based on the shouldEncrypt prop
  return (
    <div>
      <input type="file" onChange={handleFileChange} max="100000000" />
      {shouldEncrypt ? <FileEncryptor file={file} /> : <FilePasswordProtect file={file} />}
    </div>
  );
};

// Exporting the FileInput component as the default export of the module
export default FileInput;
