import { Router } from 'express';
import {
  createVehicle,
  deleteVehicle,
  getAllBookingsByVehicleId,
  getAllVehicle,
  getSpecificVehicle,
  updateVehicle,
} from '../controller/vehicle.controller';
import { Authentication } from '../middleware/authentication';
export const vehicleRouter = Router({ mergeParams: true });

vehicleRouter.post('/', Authentication.verifyAccess, createVehicle);
vehicleRouter.delete('/:vehicleId', Authentication.verifyAccess, deleteVehicle);
vehicleRouter.get('/:vehicleId/bookings', Authentication.verifyAccess, getAllBookingsByVehicleId);
vehicleRouter.get('/', getAllVehicle);
vehicleRouter.get('/:vehicleId', getSpecificVehicle);
vehicleRouter.patch('/:vehicleId', Authentication.verifyAccess, updateVehicle);
