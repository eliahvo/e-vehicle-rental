import { Layout } from '../../components/Layout';
import React from 'react';
import { Booking } from '../../util/EntityInterfaces';
import { UserBookingItem } from './components/UserBookingsList';

export const MyBookingPage = () => {
  const [userBookings, setUserBookings] = React.useState<Booking[]>([]);

  const fetchUserBookings = async () => {
    const userBookingsRequest = await fetch(`api/user/1/bookings`, {
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
