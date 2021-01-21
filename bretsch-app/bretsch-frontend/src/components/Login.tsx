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

export default function LoginFormDialog() {
  const loginContext = useContext(LoginContext);
  const [values, setValues] = useState({
    name: '',
    description: '',
  });

  const handleClose = () => {
    loginContext.toggleOpen();
  };
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
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

    await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
      }),
    });
    handleClose();
  };

  return (
    <div>
      <Dialog open={loginContext.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Welcome to BRETSCH!</DialogTitle>
        <form onSubmit={onSubmitForm} data-testid="create-task-form">
          <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth required />
            <TextField autoFocus margin="dense" id="name" label="Password" type="password" fullWidth required />
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
          <Button onClick={handleClose} color="primary">
            Register NOW!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
