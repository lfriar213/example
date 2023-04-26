// Importing React and the useState hook from the React library
import React, { useState } from 'react';

// Defining a functional component named FilePasswordProtect that takes a file prop
function FilePasswordProtect({ file }) {

  // Creating state variables named password and isPasswordProtected using the useState hook
  const [password, setPassword] = useState('');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);

  // A function that sets the password state to the value of the input field when the user types
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // A function that sets the isPasswordProtected state to true when the user clicks the "Password Protect" button
  // (but only if the password input field is not empty)
  const handlePasswordProtectClick = () => {
    if (password) {
      setIsPasswordProtected(true);
    }
  };

  // A function that creates a download link for the password-protected file and triggers the download when the user clicks the "Download Password Protected File" button
  const handleDownloadClick = () => {
    const dataBlob = new Blob([file], { type: file.type });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(dataBlob);
    downloadLink.download = file.name;
    downloadLink.click();
  };

  // Renders either the password input field and "Password Protect" button if the file is not password-protected yet,
  // or a "File password protected" message and "Download Password Protected File" button if the file is password-protected
  return (
    <div>
      {!isPasswordProtected ? (
        <div>
          <input type="text" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
          <button onClick={handlePasswordProtectClick}>Password Protect</button>
        </div>
      ) : (
        <div>
          <p>File password protected.</p>
          <button onClick={handleDownloadClick}>Download Password Protected File</button>
        </div>
      )}
    </div>
  );
}

// Exporting the FilePasswordProtect component as the default export of the module
export default FilePasswordProtect;
