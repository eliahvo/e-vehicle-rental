import { Router } from 'express';
import { bookingRouter } from './booking.router';
import { userRouter } from './user.router';
import { vehicleRouter } from './vehicle.router';
import { vehicleTypeRouter } from './vehicleType.router';

export const globalRouter: Router = Router({ mergeParams: true });

/*globalRouter.get('/', async (_: Request, res: Response) => {
    res.send('Hallo! Sie sind nun in der Anwendung.');
  });
*/


globalRouter.use('/booking', bookingRouter);
globalRouter.use('/user', userRouter);
globalRouter.use('/vehicle', vehicleRouter);
globalRouter.use('/vehicletype', vehicleTypeRouter);