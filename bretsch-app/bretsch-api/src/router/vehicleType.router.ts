import { Router } from 'express';
import {
  createVehicleType,
  deleteVehicleType,
  getAllVehiclesByVehicleTypeId,
  getAllVehicleType,
  getSpecificVehicleType,
  updateVehicleType,
} from '../controller/vehicleType.controller';
import { Authentication } from '../middleware/authentication';

export const vehicleTypeRouter = Router({ mergeParams: true });

vehicleTypeRouter.post('/', Authentication.verifyAccess, createVehicleType);
vehicleTypeRouter.delete('/:vehicleTypeId', Authentication.verifyAccess, deleteVehicleType);
vehicleTypeRouter.get('/:vehicleTypeId/vehicles', getAllVehiclesByVehicleTypeId);
vehicleTypeRouter.get('/', getAllVehicleType);
vehicleTypeRouter.get('/:vehicleTypeId', getSpecificVehicleType);
vehicleTypeRouter.patch('/:vehicleTypeId', Authentication.verifyAccess, updateVehicleType);
