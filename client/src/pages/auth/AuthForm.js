import {
  TextField,
  Typography,
  Box,
  Button,
  Paper,
  makeStyles,
} from '@material-ui/core';
import React, {useState} from 'react';

const useStyles = makeStyles({
  submit: {
    margin: '1.2rem',
  },
});

const AuthForm = ({title}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const classes = useStyles();
  return (
    <Box
      component={Paper}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      justifyContent="space-around"
      px={3}
      elevation={3}
      width="300px"
      height="400px"
    >
      <Box>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
      </Box>
      <Box
        id="signup"
        component="form"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          id="email-input"
          name="email"
          type="email"
          label="Email"
          autoComplete="username email"
          placeholder="Enter email address"
          margin="dense"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          required
        />
        <TextField
          id="password-input"
          name="password"
          type="password"
          label="Create Password"
          autoComplete="new-password"
          variant="outlined"
          margin="dense"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          required
        />
        <TextField
          name="password"
          type="password"
          label="Confirm Password"
          autoComplete="new-password"
          variant="outlined"
          margin="dense"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};
export default AuthForm;
