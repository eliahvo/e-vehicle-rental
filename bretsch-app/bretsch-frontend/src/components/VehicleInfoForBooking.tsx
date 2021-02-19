// tslint:disable: no-submodule-imports
import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { VehicleInfoContext } from '../contexts/VehicleInfoContext';
import { Box, Chip, Divider, makeStyles } from '@material-ui/core';
import { Booking, Vehicle, vehicle_status } from '../util/EntityInterfaces';
import styled from 'styled-components';
import WarningIcon from '@material-ui/icons/Warning';
import { setVehicleStats } from '../util/RequestHelper';
import { authContext } from '../contexts/AuthenticationContext';
import { LoginContext } from '../contexts/LoginContext';
import { SocketclientContext } from '../contexts/SocketclientContext';
import { useSnackbar } from 'notistack';
import { verifyAuthentication } from '../App';
import { useHistory } from 'react-router';

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
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const vehicleInfoContext = useContext(VehicleInfoContext);
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [actualBooking, setActualBooking] = useState<Booking | null>(null);
  const [socketclient, setSocketclient] = React.useContext(SocketclientContext);
  const login = useContext(LoginContext);
  const auth = useContext(authContext);
  const {
    token,
    actions: { getTokenData, logout },
  } = useContext(authContext);

  const classes = useStyles();

  const fetchVehicle = async () => {
    const vehicleRequest = await fetch(`/api/vehicle/${vehicleInfoContext.vehicleId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    if (vehicleRequest.status === 200) {
      const vehicleJSON = await vehicleRequest.json();
      setVehicle(vehicleJSON.data);
    }
  };

  const fetchActualBooking = async () => {
    if (verifyAuthentication(login, auth) && getTokenData()?.id) {
      const userRequest = await fetch(`/api/user/${getTokenData()?.id}`, {
        headers: { 'Content-Type': 'application/json', Authorization: token },
        method: 'GET',
      });
      if (userRequest.status === 200) {
        const userJSON = await userRequest.json();
        setActualBooking(userJSON.data.actualBooking);
      }
    }
  };

  useEffect(() => {
    if (vehicleInfoContext.vehicleId !== -1) {
      fetchVehicle();
      fetchActualBooking();
    }
  }, [vehicleInfoContext.vehicleId]);

  const handleClose = async (submitForm: boolean) => {
    vehicleInfoContext.toggleOpen();
    if (submitForm) setVehicleStats(vehicle?.vehicleId, vehicle_status.Used, vehicle?.batteryLevel, token);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* check if vehicle is still free */
    const vehicleRequest = await fetch(`/api/vehicle/${vehicle.vehicleId}`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleRequest.status === 200) {
      const vehicleJSON = await vehicleRequest.json();
      if (vehicleJSON.data.status !== 'Free') {
        enqueueSnackbar(`Vehicle already booked!`, {
          variant: 'error',
        });
        handleClose(false);
        return;
      }
    } else {
      enqueueSnackbar(`Error while checking vehicle status!`, {
        variant: 'error',
      });
      return;
    }

    /* check if user is logged in */
    if (verifyAuthentication(login, auth)) {
      const createBookingRequest = await fetch('/api/booking', {
        body: JSON.stringify({
          paymentStatus: 'not payed',
          price: 1 /* must be changed later */,
          startDate: new Date().toString(),
          userId: getTokenData()?.id,
          vehicleId: vehicle?.vehicleId,
        }),
        headers: { 'Content-Type': 'application/json', Authorization: token },
        method: 'POST',
      });
      if (createBookingRequest.status === 201) {
        const createBookingJSON = await createBookingRequest.json();
        try {
          const bookingId = createBookingJSON['data']['bookingId'];
          const updateUserRequest = await fetch(`/api/user/${getTokenData()?.id}`, {
            body: JSON.stringify({
              actualBookingId: bookingId,
            }),
            headers: { 'Content-Type': 'application/json', Authorization: token },
            method: 'PATCH',
          });
          if (updateUserRequest.status === 200) {
            if (socketclient) {
              socketclient.emit('booking', { vehicleId: vehicle.vehicleId });
            }
            handleClose(true);
            history.push('/booking');
          } else {
            enqueueSnackbar(`Error while updating user / adding actualBooking!`, {
              variant: 'error',
            });
            handleClose(false);
            return;
          }
        } catch (error) {
          enqueueSnackbar(`Error while extracting bookingId!`, {
            variant: 'error',
          });
          handleClose(false);
          return;
        }
      } else {
        enqueueSnackbar(`Error while creating new booking!`, {
          variant: 'error',
        });
        handleClose(false);
        return;
      }
    }
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
              Batterylevel: {vehicle?.batteryLevel}%
            </Box>
            <Box className={classes.modal} mt={1}>
              Type: {vehicle?.vehicleType.type}
            </Box>
          </Section>
          <Divider />
          {actualBooking !== null ? (
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
            <Button type="submit" disabled={actualBooking !== null} color="primary">
              BOOK NOW!
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
