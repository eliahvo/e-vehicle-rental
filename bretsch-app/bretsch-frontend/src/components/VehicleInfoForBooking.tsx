import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { VehicleInfoContext } from '../contexts/VehicleInfoContext';
import { Box, Chip, DialogContent, DialogContentText, Divider, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Vehicle, vehicle_status } from '../util/EntityInterfaces';
import useLocalStorage from '../util/LocalStorageHook';
import styled from 'styled-components';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, useTheme } from '@material-ui/core';
import { setVehicleStatus } from '../pages/Dashboard/DashboardPage';

const useStyles = makeStyles((theme) => ({
  modal: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const Section = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0 0 0;
`;

export default function VehicleInfoFormDialog() {
  const vehicleInfoContext = useContext(VehicleInfoContext);
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [submit, setSubmit] = useState(false);
  const [bookedVehicle, setBookedVehicle] = useLocalStorage('Booking.bookedVehicle', -1);
  const history = useHistory();

  const classes = useStyles();

  const fetchVehicle = async function () {
    console.log("fetchVehicle");
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
    console.log("useEffect");
    if (vehicleInfoContext.vehicleId != -1) fetchVehicle();
  }, [vehicleInfoContext.vehicleId]);

  const handleClose = (submit: boolean) => {
    vehicleInfoContext.toggleOpen();
    console.log("handleClose ");
    if(submit) setVehicleStatus(vehicle?.vehicleId, vehicle_status.Used);
    else setVehicleStatus(vehicle?.vehicleId, vehicle_status.Free);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
/*
    await fetch('/api/vehicle/' + vehicleInfoContext.vehicleId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: vehicle_status.Reserved,
      }),
    });*/
    handleClose(true);
    //create new Booking
    //to do

    setBookedVehicle(vehicleInfoContext.vehicleId);
    history.push('/booking');
  };

  return (
    <div>
      <Dialog  open={vehicleInfoContext.open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-vehicleInfo">
        <DialogTitle style={{ textAlign: "center" }} id="form-dialog-vehicleInfo">{`${vehicle?.licencePlate} ${vehicle?.vehicleId}`}</DialogTitle>
        <form onSubmit={onSubmitForm}>
          <Section>
            <Box className={classes.modal} mt={1}> Batterylevel: {vehicle?.batteryLevel}%</Box>
            <Box className={classes.modal} mt={1}> Type: {vehicle?.vehicleType.type}</Box>
          </Section>
          <Divider />
          {bookedVehicle != -1 ? <Chip className={classes.modal}
            label="You already booked a vehicle!"
            size="small"
            avatar={<WarningIcon style={{ fill: 'white' }} />}
            style={{ color: 'white', backgroundColor: 'red' }}
          /> : ""}
          <DialogActions>
            <Button type="submit" disabled={bookedVehicle != -1} color="primary">
              BOOK NOW!
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}