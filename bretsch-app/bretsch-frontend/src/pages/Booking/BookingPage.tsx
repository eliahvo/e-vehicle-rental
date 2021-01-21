import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { Booking } from '../../util/EntityInterfaces';
import styled from 'styled-components';

export const BookingDiv = styled.div`
  margin: 5rem 5rem 10rem 10rem;
`;

export const BookingPage = () => {
  const [booking, setBooking] = useState<Booking>();

  const fetchBookings = async function () {
    const bookingsRequest = await fetch(`/api/user/1/bookings`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });

    if (bookingsRequest.status === 200) {
      const bookingsJSON = await bookingsRequest.json();
      setBooking(bookingsJSON.data);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Layout title="Booking">
      <BookingDiv>
        test
      </BookingDiv>
    </Layout>
  );
};
