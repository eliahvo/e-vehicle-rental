import React, { useEffect, useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';
import { Vehicle, VehicleType } from '../../../util/EntityInterfaces';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';

export const ChipsPos = styled.span`
  margin: 0.2%;
`;

export const VehicleTypeChips = () => {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [vehicleTypes, setVehiclesType] = useState<VehicleType[]>([]);
  const [choosedVehicleType, setchoosedVehiclesType] = useState<VehicleType | null>(null);

  const handleClickOpen = async (t: VehicleType) => {
    setchoosedVehiclesType(t);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlert(false);
  };

  useEffect(() => {
    allVehicleTypes().then((r) => printChips());
  }, []);

  const printChips = () => {
    const chips = [];
    for (const t of vehicleTypes) {
      chips.push(
        <ChipsPos id={t.vehicleTypeId.toString()}>
          <Chip
            label={t.type}
            onClick={updateVehicleType}
            onDelete={() => {
              handleClickOpen(t);
            }}
            color="primary"
            variant="outlined"
          />
        </ChipsPos>,
      );
    }
    return chips;
  };

  const updateVehicleType = async () => {
    console.log('Update');
  };

  const allVehicleTypes = async () => {
    const vehicleTypeRequest = await fetch(`/api/vehicletype/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleTypeRequest.status === 200) {
      const vehicleTypeJSON = await vehicleTypeRequest.json();
      setVehiclesType(vehicleTypeJSON.data);
    }
  };

  const deleteOneVehicleType = async (e: any) => {
    if (choosedVehicleType) {
      const vehicleTypeRequest = await fetch(`/api/vehicletype/` + choosedVehicleType.vehicleTypeId.toString(), {
        headers: { 'content-type': 'application/json' },
        method: 'DELETE',
      });
      if (vehicleTypeRequest.status === 200) {
        const vehicleTypeJSON = await vehicleTypeRequest.json();
        await allVehicleTypes();
      }
    }
  };

  const dialog = () => {
    let type = '';
    if (choosedVehicleType) {
      type = choosedVehicleType.type;
      return (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogTitle id="alert-dialog-title">{'Delete Vehicle Type: ' + type}</DialogTitle>
            <DialogContentText id="alert-dialog-description">
              <p>Are you sure you want to delete the following vehicle Type?</p>
              <p>This will also delete all according Vehicles irrevocably.</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              NO!
            </Button>
            <Button onClick={deleteOneVehicleType} color="primary">
              Delete irrevocably
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return <></>;
  };

  return (
    <div>
      {printChips()}
      {dialog()}
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          A Vehicle Type was sucessfully deleted!
        </Alert>
      </Snackbar>
    </div>
  );
};
