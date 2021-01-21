import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { VehicleInfoContext } from '../contexts/VehicleInfoContext';
import { DialogContent, DialogContentText, Divider, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Vehicle, vehicle_status } from '../util/EntityInterfaces';
import useLocalStorage from '../util/LocalStorageHook';

export default function VehicleInfoFormDialog() {
  const vehicleInfoContext = useContext(VehicleInfoContext);
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [reservedVehicle, setReservedVehicle] = useLocalStorage('Booking.reservedVehicle', -1);
  const history = useHistory();
  
  const fetchVehicle = async function () {
    const vehicleRequest = await fetch("/api/vehicle/" + vehicleInfoContext.vehicleId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (vehicleRequest.status === 200) {
      const vehicleJSON = await vehicleRequest.json();
      setVehicle(vehicleJSON.data);
    }
  };

  useEffect(() => {
    if(vehicleInfoContext.vehicleId != -1) fetchVehicle();
  }, []);

  const handleClose = () => {
    vehicleInfoContext.toggleOpen();
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/vehicle/' + vehicleInfoContext.vehicleId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: vehicle_status.Reserved,
      }),
    });
    handleClose();
    setReservedVehicle(vehicleInfoContext.vehicleId);
    history.push('/booking');
  };

  return (
    <div>
      <Dialog open={vehicleInfoContext.open} onClose={handleClose} aria-labelledby="form-dialog-vehicleInfo">
        <DialogTitle id="form-dialog-vehicleInfo">{vehicleInfoContext.vehicleId}</DialogTitle>
        <form onSubmit={onSubmitForm}>

          <Divider />
          {reservedVehicle != -1 ? <p>You already reserved a vehicle!</p> : ""}
          <DialogActions>
            <Button type="submit" disabled={reservedVehicle != -1} color="primary">
              BOOK NOW!
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}