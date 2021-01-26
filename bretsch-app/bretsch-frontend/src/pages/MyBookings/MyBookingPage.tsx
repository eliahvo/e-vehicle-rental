import { Layout } from '../../components/Layout';
import React, { useContext } from 'react';
import { Booking } from '../../util/EntityInterfaces';
import { UserBookingItem } from './components/UserBookingsList';
import { authContext } from '../../contexts/AuthenticationContext';

export const MyBookingPage = () => {
  const [userBookings, setUserBookings] = React.useState<Booking[]>([]);
  const {
    actions: { getTokenData },
  } = useContext(authContext);

  const fetchUserBookings = async () => {
    const userBookingsRequest = await fetch(`api/user/${getTokenData()?.id}/bookings`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    console.log(userBookingsRequest);
    if (userBookingsRequest.status === 200) {
      const taskJSON = await userBookingsRequest.json();
      console.log(taskJSON.data);
      setUserBookings(taskJSON.data);
    }
    console.log(userBookings);
  };

  React.useEffect(() => {
    fetchUserBookings();
  }, []);

  return (
    <Layout title="My Bookings">
      {userBookings.map((booking: Booking) => (
        <UserBookingItem key={booking.bookingId} booking={booking} />
      ))}
    </Layout>
  );
};
