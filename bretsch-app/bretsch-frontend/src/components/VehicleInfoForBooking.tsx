import React, { useContext, useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { VehicleInfoContext } from '../contexts/VehicleInfoContext';
import { DialogContent, DialogContentText, Divider, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function VehicleInfoFormDialog() {
  const vehicleInfoContext = useContext(VehicleInfoContext);
  const history = useHistory();

  const handleClose = () => {
    vehicleInfoContext.toggleOpen();
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/vehicle/' + vehicleInfoContext.vehicleId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: "reserved"
      }),
    });
    handleClose();
    history.push('/booking');
  };

  return (
    <div>
      <Dialog open={vehicleInfoContext.open} onClose={handleClose} aria-labelledby="form-dialog-vehicleInfo">
        <DialogTitle id="form-dialog-vehicleInfo">{vehicleInfoContext.vehicleId}</DialogTitle>
        <form onSubmit={onSubmitForm}>
          <Divider />
          <DialogActions>
            <Button type="submit" color="primary">
              BOOK NOW!
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}