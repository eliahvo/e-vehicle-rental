import { build } from 'test-data-bot';

export const adminBookingsBuilder = ({}) =>
    build('AdminBookings').fields({
        bookingPaymentStatus: 'free',
        bookingStart: '17/02/2021',
        bookingTimePicker: '11:39 PM',
        newbookingPaymentStatus: 'used',
        newbookingStart: '18/02/2021',
        newbookingTimePicker: '10:22 PM',
        newbookingPrice: '123',
    });