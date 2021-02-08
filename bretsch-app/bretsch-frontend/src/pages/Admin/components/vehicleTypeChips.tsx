import React, { useEffect, useState } from 'react';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Vehicle, VehicleType } from '../../../util/EntityInterfaces';

export const VehicleTypeChips = () => {
  const [open, setOpen] = React.useState(false);
  const [vehicleTypes, setVehiclesType] = useState<VehicleType[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    allVehicleTypes().then((r) => printChips());
  }, []);
  /*const deleteVehicleType = async () => {

    }*/

  const printChips = () => {
    const chips = [];
    for (const t of vehicleTypes) {
      chips.push(<Chip label={t.type} onDelete={handleClickOpen} color="primary" variant="outlined" />);
    }
    return chips;
  };

  const allVehicleTypes = async () => {
    const vehicleTypeRequest = await fetch(`/api/vehicletype/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleTypeRequest.status === 200) {
      const vehicleJSON = await vehicleTypeRequest.json();
      setVehiclesType(vehicleJSON.data);
    }
  };

  return (
    <div>
      {printChips()}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Vehicle Type'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the following vehicle Type? This will also delete all Vehicles irrevocably.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            NO!
          </Button>
          <Button onClick={handleClose} color="primary">
            Delete irrevocably
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
