import { Router } from 'express';
import {
    createBooking,
    deleteBooking,
    getAllBooking,
    getSpecificBooking,
    updateBooking
} from '../controller/booking.controller';


export const bookingRouter = Router({ mergeParams: true });

bookingRouter.post('/', createBooking);
bookingRouter.delete('/:bookingId', deleteBooking);
bookingRouter.get('/', getAllBooking);
bookingRouter.get('/:bookingId', getSpecificBooking);
bookingRouter.patch('/:bookingId', updateBooking);
