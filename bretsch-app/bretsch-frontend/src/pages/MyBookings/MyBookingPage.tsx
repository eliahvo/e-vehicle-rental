import { Layout } from '../../components/Layout';
import React, { useContext } from 'react';
import { Booking } from '../../util/EntityInterfaces';
import { UserBookingItem } from './components/UserBookingsList';
import { authContext } from '../../contexts/AuthenticationContext';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router';

export const BookingDiv = styled.div`
  margin: 5rem 5rem 10rem 10rem;
`;

export const Heading = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const MyBookingPage = () => {
  const history = useHistory();
  const [userBookings, setUserBookings] = React.useState<Booking[]>([]);
  const {
    token,
    actions: { getTokenData },
  } = useContext(authContext);

  const fetchUserBookings = async () => {
    const userBookingsRequest = await fetch(`api/user/${getTokenData()?.id}/bookings`, {
      headers: { 'content-type': 'application/json', Authorization: token },
      method: 'GET',
    });
    if (userBookingsRequest.status === 200) {
      const taskJSON = await userBookingsRequest.json();
      setUserBookings(taskJSON.data);
    }
  };

  React.useEffect(() => {
    fetchUserBookings();
  }, []);

  if (userBookings.length) {
    return (
      <Layout title="My Bookings">
        {userBookings.reverse().map((booking: Booking) => {
          if (booking.paymentStatus === 'payed') {
            return <UserBookingItem key={booking.bookingId} booking={booking} />;
          }
        })}
      </Layout>
    );
  } else {
    return (
      <Layout title="My Bookings">
        <BookingDiv>
          <Heading>
            <p>No previous bookings!</p>
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
  }
};
