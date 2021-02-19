import { Router } from 'express';
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getSpecificBooking,
  updateBooking,
} from '../controller/booking.controller';

export const bookingRouter = Router({ mergeParams: true });

bookingRouter.post('/', createBooking);
bookingRouter.delete('/:bookingId', deleteBooking);
bookingRouter.get('/', getAllBookings);
bookingRouter.get('/:bookingId', getSpecificBooking);
bookingRouter.patch('/:bookingId', updateBooking);
