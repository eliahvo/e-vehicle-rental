// tslint:disable: no-submodule-imports
import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { VehicleInfoContext } from '../contexts/VehicleInfoContext';
import { Box, Chip, Divider, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Vehicle, vehicle_status } from '../util/EntityInterfaces';
import useLocalStorage from '../util/LocalStorageHook';
import styled from 'styled-components';
import WarningIcon from '@material-ui/icons/Warning';
import { setVehicleStatus } from '../util/RequestHelper';

const useStyles = makeStyles((theme) => ({
  modal: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
}));

export const Section = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0 0 0;
`;

export default function vehicleInfoFormDialog() {
  const vehicleInfoContext = useContext(VehicleInfoContext);
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [submit, setSubmit] = useState(false); // ToDo: What is this used for? Necessary? If not, remove
  const [bookedVehicle, setBookedVehicle] = useLocalStorage('Booking.bookedVehicle', -1);
  const history = useHistory();

  const classes = useStyles();

  const fetchVehicle = async () => {
    console.log('fetchVehicle');
    const vehicleRequest = await fetch(`/api/vehicle/${vehicleInfoContext.vehicleId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    if (vehicleRequest.status === 200) {
      const vehicleJSON = await vehicleRequest.json();
      setVehicle(vehicleJSON.data);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    if (vehicleInfoContext.vehicleId !== -1) fetchVehicle();
  }, [vehicleInfoContext.vehicleId]);

  const handleClose = (submitForm: boolean) => {
    vehicleInfoContext.toggleOpen();
    console.log('handleClose ');
    if (submitForm) setVehicleStatus(vehicle?.vehicleId, vehicle_status.Used);
    else setVehicleStatus(vehicle?.vehicleId, vehicle_status.Free); // ToDo: Currently vehicle changes position even if booking was cancelled
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmit(true);
    handleClose(true);

    /* create new Booking */
    const createBookingRequest = await fetch('/api/booking', {
      body: JSON.stringify({
        paymentStatus: 'not payed',
        price: 1,
        startDate: new Date().toString(),
        userId: 1 /* must be changed later */,
        vehicleId: vehicle?.vehicleId,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    if (createBookingRequest.status === 200) {
      console.log('booking created');
      const createBookingJSON = await createBookingRequest.json();
      try {
        const bookingId = createBookingJSON['data']['bookingId'];
        const updateUserRequest = await fetch('/api/user/1', {
          /* 1 must be replaced with actual logged in userid */
          body: JSON.stringify({
            actualBookingId: bookingId,
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'PATCH',
        });
        if (updateUserRequest.status === 200) {
          console.log('added actualBooking');
        } else {
          console.log('error by updating user/ adding actualBooking');
          return;
        }
      } catch (error) {
        console.log('error by extracting bookingId');
        return;
      }
    } else {
      console.log('error by creating new booking');
      return;
    }

    setBookedVehicle(vehicleInfoContext.vehicleId);
    history.push('/booking');
  };

  return (
    <div>
      <Dialog
        open={vehicleInfoContext.open}
        onClose={() => handleClose(false)}
        aria-labelledby="form-dialog-vehicleInfo"
      >
        <DialogTitle
          style={{ textAlign: 'center' }}
          id="form-dialog-vehicleInfo"
        >{`${vehicle?.licencePlate}`}</DialogTitle>
        <form onSubmit={onSubmitForm}>
          <Section>
            <Box className={classes.modal} mt={1}>
              {' '}
              Batterylevel: {vehicle?.batteryLevel}%
            </Box>
            <Box className={classes.modal} mt={1}>
              {' '}
              Type: {vehicle?.vehicleType.type}
            </Box>
          </Section>
          <Divider />
          {bookedVehicle !== -1 ? (
            <Chip
              className={classes.modal}
              label="You already booked a vehicle!"
              size="small"
              avatar={<WarningIcon style={{ fill: 'white' }} />}
              style={{ color: 'white', backgroundColor: 'red' }}
            />
          ) : (
            ''
          )}
          <DialogActions>
            <Button type="submit" disabled={bookedVehicle !== -1} color="primary">
              BOOK NOW!
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
