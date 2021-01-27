import React, { useContext, useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RegisterContext } from '../contexts/RegisterContext';
import { Divider } from '@material-ui/core';
import { authContext, RegisterOptions } from '../contexts/AuthenticationContext';





export default function RegisterModal() {


  const auth = useContext(authContext);
  const registerContext = useContext(RegisterContext);
  const [values, setValues] = useState<RegisterOptions>({
    email: '',
    password: '', 
    firstName: '',
    lastName: '',
    birthDate: '',
    preferedPayment: '',
    streetPlusNumber: '',
    city: '',
    });
 


  const handleClose = () => {
    registerContext.toggleOpen();
    
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
    console.log(values);
    e.preventDefault();
    auth.actions.register(values);
    handleClose();
  };




  return (
    <div>
      <Dialog open={registerContext.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={fieldDidChange}
              required
            />
            <TextField
              autoFocus
              name="firstName"
              margin="dense"
              id="firstName"
              label="First name"
              type="text"
              fullWidth
              onChange={fieldDidChange}
              required
            />
            <TextField
              autoFocus
              name="lastName"
              margin="dense"
              id="lastName"
              label="Last name"
              type="text"
              fullWidth
              onChange={fieldDidChange}
              required
            />
            <TextField
              autoFocus
              name="birthDate"
              margin="dense"
              id="birthDate"
              label="Birthdate"
              type="text"
              fullWidth
              onChange={fieldDidChange}
              required
            />
            <TextField
              autoFocus
              name="preferedPayment"
              margin="dense"
              id="preferedPayment"
              label="prefered payment"
              type="text"
              fullWidth
              onChange={fieldDidChange}
              required
            />
        <TextField
              autoFocus
              name="streetPlusNumber"
              margin="dense"
              id="streetPlusNumber"
              label="Street and Number"
              type="text"
              fullWidth
              onChange={fieldDidChange}
              required
            />
        <TextField
              autoFocus
              name="city"
              margin="dense"
              id="city"
              label="City"
              type="text"
              fullWidth
              onChange={fieldDidChange}
              required
            />
            
      
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Register NOW!
            </Button>
          </DialogActions>
        </form>
        <Divider />
        
      </Dialog>
    </div>
  );
}
