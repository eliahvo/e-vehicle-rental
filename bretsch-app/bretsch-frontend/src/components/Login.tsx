import React, { useContext, useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { LoginContext } from '../contexts/LoginContext';
import { Divider, Typography } from '@material-ui/core';
import { authContext, LoginOptions } from '../contexts/AuthenticationContext';
import RegisterModal from './Register';
import { RegisterContext } from '../contexts/RegisterContext';

export default function LoginFormDialog() {
  const auth = useContext(authContext);
  const loginContext = useContext(LoginContext);
  const [values, setValues] = useState<LoginOptions>({ email: '', password: '' });
  const [openRegister, setOpenRegister] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const handleClose = () => {
    setValues({ ...values, password: '' });
    loginContext.toggleOpen();
  };

  const format = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (format.test(e.target.value)) {
      e.target.value = values.email;
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
      setErrorText('');
    }
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loggedIn: boolean = await auth.actions.login(values);
    if (loggedIn) {
      handleClose();
    } else {
      setErrorText('Incorrect email or password!');
      setValues({ ...values, password: '' });
    }
  };

  const toggleOpenState = () => {
    setOpenRegister(!openRegister);
  };

  const registerContext = {
    email: values.email,
    open: openRegister,
    toggleOpen: toggleOpenState,
  };

  return (
    <div>
      <RegisterContext.Provider value={registerContext}>
        <Dialog open={loginContext.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Welcome to BRETSCH!</DialogTitle>
          <form onSubmit={onSubmitForm} data-testid="create-task-form">
            <DialogContent>
              <TextField
                autoFocus
                value={values.email}
                name="email"
                margin="dense"
                id="email"
                label="E-Mail"
                type="email"
                fullWidth
                onChange={fieldDidChange}
                required
              />
              <TextField
                value={values.password}
                name="password"
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                onChange={fieldDidChange}
                required
              />
            </DialogContent>
            <DialogActions>
              <Typography color="error">{errorText}</Typography>
              <Button type="submit" color="primary">
                Sign In
              </Button>
            </DialogActions>
          </form>
          <Divider />
          <DialogActions>
            <p>Not BRETSCHing yet?</p>
            <Button
              data-testid="register-button-id"
              onClick={() => {
                setOpenRegister(true);
              }}
              color="primary"
            >
              Register
            </Button>
          </DialogActions>
        </Dialog>
        <RegisterModal />
      </RegisterContext.Provider>
    </div>
  );
}
