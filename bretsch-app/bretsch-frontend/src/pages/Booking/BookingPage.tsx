import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { Booking } from '../../util/EntityInterfaces';
import styled from 'styled-components';
import { Box, Button, Divider, Grid } from '@material-ui/core';
import useLocalStorage from '../../util/LocalStorageHook';

export const BookingDiv = styled.div`
  margin: 5rem 5rem 10rem 10rem;
`;

export const Heading = styled.div`
  font-size: 3rem;
  text-align: center;
`;

export const Time = styled.div`
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [booking, setBooking] = useState<Booking>();
  const [bookedVehicle, setBookedVehicle] = useLocalStorage('Booking.bookedVehicle', -1);

  const fetchBookings = async function () {
    const bookingsRequest = await fetch(`/api/user/1/bookings`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });

    if (bookingsRequest.status === 200) {
      const bookingsJSON = await bookingsRequest.json();
      setBookings(bookingsJSON.data);
    }
  };

  const stopBooking = async () => {
    const bookingPatch = await fetch(`/api/booking/` + booking?.bookingId, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        endDate: new Date().toString(),
        price: 100, /* must be calculated */
        paymentStatus: "payed",
      }),
    });

    if (bookingPatch.status === 200) {
      console.log("booking updated");
      fetchBookings();  /* should reload page but doesn't work yet */
      setBookedVehicle(-1);
    }else {
      console.log("error by updating booking");
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    for (let b of bookings) {
      if (b.paymentStatus == "not payed") {
        setBooking(b);
        break;
      }
    }
  }, [bookings]);

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
              <Grid item xs={2}>
                Type:
              </Grid>
              <Grid item xs={2}>
                {booking?.vehicle.vehicleType.type}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                Batterylevel:
              </Grid>
              <Grid item xs={2}>
                {booking?.vehicle.batteryLevel}%
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                Start date:
              </Grid>
              <Grid item xs={4}>
                {new Date(booking?.startDate).toLocaleString()}
              </Grid>
            </Grid>
            <Divider />

            {/* timer */}
            <Time>
              00:00:00
            </Time>

            {/* stop booking button */}
            <Box mt={1} mb={1}>
              <ButtonStyle>
                <Button onClick={stopBooking}>
                  Stop
                </Button>
              </ButtonStyle>
            </Box>
          </Section>
        </BookingDiv>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <BookingDiv>
          {/* hypertext with info */}
          <Heading>No active booking!</Heading>
        </BookingDiv>
      </Layout>
    );
  }
};
