import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FileInput from './FileInput';
import FileEncryptor from './FileEncryptor';
import FileDecryptor from './FileDecryptor';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function EncryptPage() {
  const classes = useStyles();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Container maxWidth="lg" className={classes.main}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Encrypt File
            </Typography>
            <FileInput onChange={handleFileChange} />
            {file && <FileEncryptor file={file} />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

function DecryptPage() {
  const classes = useStyles();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Container maxWidth="lg" className={classes.main}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Decrypt File
            </Typography>
            <FileInput onChange={handleFileChange} />
            {file && <FileDecryptor file={file} />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          HASH.NEW
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your personal all-in-one tool for file encryption and decryption
        </Typography>
        <Router>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Link to="/encrypt" className={classes.link}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Encrypt File
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Securely encrypt your file using AES encryption.
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/decrypt" className={classes.link}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Decrypt File
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Decrypt your file using the secret key used during encryption.
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          </Grid>
          <Routes>
            <Route path="/encrypt" element={<EncryptPage />} />
            <Route path="/decrypt" element={<DecryptPage />} />
          </Routes>
        </Router>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">My sticky footer can be found here.</Typography>
        </Container>
      </footer>
    </div>
  );
}
export default App;