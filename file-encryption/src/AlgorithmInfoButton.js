import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function AlgorithmInfoButton({ algorithm }) {
  const classes = useStyles();

  const tooltipText = `Learn more about ${algorithm}`;

  const handleClick = () => {
    // handle button click
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    window.open('https://www.geeksforgeeks.org/blowfish-algorithm-with-examples/', '_blank');
  };

  return (
    <Tooltip title={tooltipText} aria-label={tooltipText}>
      <Button
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={handleClick}
      >
        <a href="#" onClick={handleLinkClick} style={{textDecoration: 'none', color: 'inherit'}}>
          Learn More
        </a>
      </Button>
    </Tooltip>
  );
}

export default AlgorithmInfoButton;
