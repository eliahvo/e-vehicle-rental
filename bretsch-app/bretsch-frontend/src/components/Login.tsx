import React, { useContext, useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { LoginContext } from '../contexts/LoginContext';
import { Divider } from '@material-ui/core';
import { authContext, LoginOptions } from '../contexts/AuthenticationContext';
import { useHistory } from 'react-router-dom';
import RegisterModal from './Register';
import { RegisterContext } from '../contexts/RegisterContext';

export default function LoginFormDialog() {
  const auth = useContext(authContext);
  const loginContext = useContext(LoginContext);
  let history = useHistory();
  const [values, setValues] = useState<LoginOptions>({ email: '', password: '' });
  const [openRegister, setOpenRegister] = React.useState(false);

  const handleClose = () => {
    loginContext.toggleOpen();
  };
  const format = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (format.test(e.target.value)) {
      alert('Sonderzeichen sind im Namen nicht erlaubt!');
      e.target.value = '';
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.actions.login(values);
    handleClose();
  };

  const toggleOpenState = () => {
    setOpenRegister(!openRegister);
  };

  const registerContext = {
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
                name="email"
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={fieldDidChange}
                required
              />
              <TextField
                autoFocus
                name="password"
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                onChange={fieldDidChange}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Sign In
              </Button>
            </DialogActions>
          </form>
          <Divider />
          <DialogActions>
            <DialogContentText> Not BRETSCHing yet?</DialogContentText>
            <Button
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
