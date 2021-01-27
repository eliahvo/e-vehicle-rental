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
import { makeStyles } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';



const PaymentMethod = [
  {
    value: 'Paypal',
    label: 'Paypal',
  },
  {
    value: 'Visa',
    label: 'Visa',
  },
  {
    value: 'Bitcoin',
    label: 'Bitcoin',
  },
  {
    value: 'Mastercard',
    label: 'Mastercard',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const useDateStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function RegisterModal() {

  const dateStyle = useDateStyles();
  const classes = useStyles();
  const [chosenPayment, setChosenPayment] = React.useState('EUR');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChosenPayment(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };



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
  
  const dateFieldChange =  (e: ChangeEvent<HTMLInputElement>) => {
    
      setValues({ ...values, [e.target.name]: e.target.value });
      
    
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
              id="birthDate"
              name="birthDate"
              margin="dense"
              onChange={dateFieldChange}
              required
              fullWidth
              label="Birthday"
              type="date"
              defaultValue="2000-01-01"
              className={dateStyle.textField}
              InputLabelProps={{
                shrink: true,
        }}
      />
            <TextField
              autoFocus
              name="preferedPayment"
              margin="dense"
              id="preferedPayment"
              select
              label="Prefered Payment"
              type="text"
              value={chosenPayment}
              onChange={handleChange}
              helperText="Please select your favourite payment method"
            >
              {PaymentMethod.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                  {option.label}
              </MenuItem>
              ))}
            </TextField>
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
