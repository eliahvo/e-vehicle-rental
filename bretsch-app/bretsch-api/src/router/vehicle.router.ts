import { Router } from 'express';
import {
  createVehicle,
  deleteVehicle,
  getAllBookingsByVehicleId,
  getAllVehicle,
  getSpecificVehicle,
  updateVehicle,
} from '../controller/vehicle.controller';

export const vehicleRouter = Router({ mergeParams: true });

vehicleRouter.post('/', createVehicle);
vehicleRouter.delete('/:vehicleTypeId', deleteVehicle);
vehicleRouter.get('/:vehicleId/bookings', getAllBookingsByVehicleId);
vehicleRouter.get('/', getAllVehicle);
vehicleRouter.get('/:vehicleTypeId', getSpecificVehicle);
vehicleRouter.patch('/:vehicleTypeId', updateVehicle);
