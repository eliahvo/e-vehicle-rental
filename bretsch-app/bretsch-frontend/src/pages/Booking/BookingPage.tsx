import { Layout } from '../../components/Layout';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Booking, vehicle_status } from '../../util/EntityInterfaces';
import styled from 'styled-components';
import { Box, Button, Divider, Grid, MenuItem, TextField } from '@material-ui/core';
import useLocalStorage from '../../util/LocalStorageHook';
import { setVehicleStats } from '../../util/RequestHelper';
import { authContext } from '../../contexts/AuthenticationContext';
import { SocketclientContext } from '../../contexts/SocketclientContext';
import { PaymentContext } from '../../contexts/PaymentContext';
import { Payment } from '../../components/Payment';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';

/**
 * convert ms to form "XX:XX:XX"
 * @param ms
 * @returns time in form "XX:XX:XX"
 */
export function msToHMS(ms: any) {
  var pad = function (num: number, size: number) {
    return ('000' + num).slice(size * -1);
  };

  let seconds = ms / 1000;
  let hours = parseInt((seconds / 3600).toString()); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  let minutes = parseInt((seconds / 60).toString()); // 60 seconds in 1 minute
  seconds = seconds % 60;

  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}

export const BookingDiv = styled.div`
  margin: 5rem 5rem 10rem 10rem;
`;

export const Heading = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Main = styled.div`
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;
`;

export const Section = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0 0 0;
`;

export const ButtonStyle = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0 0 0;
  text-align: center;
`;

export const BookingPage = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [booking, setBooking] = useState<Booking>();
  const {
    token,
    actions: { getTokenData },
  } = useContext(authContext);
  const [chosenPayment, setChosenPayment] = React.useState('Paypal'); // must be changed later
  const [socketclient, setSocketclient] = React.useContext(SocketclientContext);
  const [openPayment, setOpenPayment] = React.useState(false);
  const [stopButtonClicked, setStopButtonClicked] = React.useState(false);
  const [timeAtStopClicked, setTimeAtStopClicked] = React.useState(0);
  const [currentPrice, setCurrentPrice] = React.useState('');
  const [time, setTime] = useState('');
  const [battery, setBattery] = useState<number>(0);

  useEffect(() => {
    fetchBooking();
  }, []);

  useEffect(() => {
    if (booking) {
      setTime(getDateDifference());
      setCurrentPrice(getPrice());
    }
  }, [booking]);

  useEffect(() => {
    if (booking && !stopButtonClicked) {
      setTimeout(() => {
        setTime(getDateDifference());
        setCurrentPrice(getPrice());
      }, 1000);
    }
  });

  const toggleOpenState = () => {
    setOpenPayment(!openPayment);
  };

  const paymentContext = {
    open: openPayment,
    toggleOpen: toggleOpenState,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChosenPayment(e.target.value);
  };

  {
    /* returns date difference from startDate and current date to form "XX:XX:XX" */
  }

  const getDateDifference = (): string => {
    if (booking) {
      const actualDate = new Date();
      const ms = actualDate.getTime() - new Date(booking.startDate).getTime();
      return msToHMS(ms - (ms % 1000));
    }
    return '00:00:00';
  };

  const getPrice = (): string => {
    if (booking) {
      const actualDate = new Date();
      const ms = actualDate.getTime() - new Date(booking.startDate).getTime();
      const m = Math.ceil(ms / 1000 / 60);
      setBattery(Math.round(ms / 1000 / 30));
      const price: number =
        Number(booking.vehicle.vehicleType.startPrice) + m * Number(booking.vehicle.vehicleType.pricePerMinute);
      return price.toFixed(2);
    }
    return '0.00';
  };

  const fetchBooking = async () => {
    const userRequest = await fetch(`/api/user/${getTokenData()?.id}`, {
      /* 1 must be replaced with actual logged in userId */
      headers: { 'content-type': 'application/json', Authorization: token },
      method: 'GET',
    });

    if (userRequest.status === 200) {
      const userJSON = await userRequest.json();
      if (userJSON.data.actualBooking) {
        const bookingRequest = await fetch(`/api/booking/${userJSON.data.actualBooking.bookingId}`, {
          headers: { 'content-type': 'application/json', Authorization: token },
          method: 'GET',
        });

        if (bookingRequest.status === 200) {
          const bookingJSON = await bookingRequest.json();
          setBooking(bookingJSON.data);
        }
      }
    }
  };

  const stopBooking = async () => {
    {
      /* updating booking */
    }
    const bookingPatch = await fetch(`/api/booking/${booking?.bookingId}`, {
      body: JSON.stringify({
        endDate: new Date().toString(),
        paymentStatus: 'payed' /* maybe must be changed */,
        price: Number(currentPrice),
      }),
      headers: { 'content-type': 'application/json', Authorization: token },
      method: 'PATCH',
    });

    if (bookingPatch.status === 200) {
      const newBattery: number = Number(booking?.vehicle.batteryLevel) - battery;
      setVehicleStats(booking?.vehicle.vehicleId, vehicle_status.Free, newBattery, token);

      {
        /* updating user */
      }
      const userPatch = await fetch(`/api/user/${getTokenData()?.id}`, {
        body: JSON.stringify({
          actualBookingId: -1,
        }),
        headers: { 'content-type': 'application/json', Authorization: token },
        method: 'PATCH',
      });

      if (userPatch.status === 200) {
        setBooking(undefined);
        fetchBooking();
        socketclient.emit('stopBooking', { vehicleId: booking?.vehicle.vehicleId });
      } else {
        enqueueSnackbar(`Error while updating user!`, {
          variant: 'error',
        });
      }
    } else {
      enqueueSnackbar(`Error while updating booking!`, {
        variant: 'error',
      });
    }
  };

  if (booking) {
    return (
      <Layout title="Booking">
        <BookingDiv>
          {/* hypertext with license plate */}
          <Heading>{booking?.vehicle.licencePlate}</Heading>
          <Divider />

          {/* vehicle info */}
          <Section>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                Type:
              </Grid>
              <Grid item xs={2}>
                {booking?.vehicle.vehicleType.type}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                Battery level:
              </Grid>
              <Grid item xs={2}>
                {booking?.vehicle.batteryLevel}%
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                Start date:
              </Grid>
              <Grid item xs={7}>
                {new Date(booking?.startDate).toLocaleString()}
              </Grid>
            </Grid>
            <Divider />

            {/* timer */}
            <Main>{time}</Main>
            <Main>{currentPrice ? `${currentPrice}€` : ''}</Main>

            <Heading>
              {/* stop booking button */}
              <ButtonStyle>
                <PaymentContext.Provider value={paymentContext}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      toggleOpenState();
                      setStopButtonClicked(true);
                      setTimeAtStopClicked(parseInt(time, 10));
                    }}
                  >
                    Stop booking
                  </Button>
                  <Payment
                    stopBooking={stopBooking}
                    price={Number(currentPrice)}
                    setStopButtonClicked={setStopButtonClicked}
                  />
                </PaymentContext.Provider>
              </ButtonStyle>
            </Heading>
          </Section>
        </BookingDiv>
      </Layout>
    );
  }
  return (
    <Layout title="Booking">
      <BookingDiv>
        {/* hypertext with info */}
        <Heading>
          <p>No active booking!</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push('/');
            }}
          >
            Start bretsching now!
          </Button>
        </Heading>
      </BookingDiv>
    </Layout>
  );
};
