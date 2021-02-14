import { Booking, User } from '../../../util/EntityInterfaces';
import React, { useEffect, useState } from 'react';
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import Button from '@material-ui/core/Button';

export const BookingTable = (props) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    if (props.bookings) {
      setBookings(props.bookings);
    }
  }, [props.bookings]);

  // all bookings
  const bookingRows: any[] = [];
  for (const booking of bookings) {
    bookingRows.push({
      id: booking.bookingId,
      startdate: booking.startDate,
      enddate: booking.endDate,
      payment: booking.paymentStatus,
      price: booking.price,
    });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={[
              { field: 'id', headerName: 'ID' },
              { field: 'startdate', headerName: 'Start' },
              { field: 'enddate', headerName: 'End' },
              { field: 'payment', headerName: 'Payment Status' },
              { field: 'price', headerName: 'Price' },
            ]}
            rows={bookingRows}
            disableColumnMenu
            showToolbar
          />
        </div>
      </div>
    </div>
  );
};
