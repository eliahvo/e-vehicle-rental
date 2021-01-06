import { Router } from 'express';
import {
    createVehicleType,
    deleteVehicleType,
    getAllVehiclesByVehicleTypeId,
    getAllVehicleType,
    getSpecificVehicleType,
    updateVehicleType
} from '../controller/vehicleType.controller';


export const vehicleTypeRouter = Router({ mergeParams: true });

vehicleTypeRouter.post('/', createVehicleType);
vehicleTypeRouter.get('/', getAllVehicleType);
vehicleTypeRouter.get('/:vehicleTypeId', getSpecificVehicleType);
vehicleTypeRouter.patch('/:vehicleTypeId', updateVehicleType);
vehicleTypeRouter.delete('/:vehicleTypeId', deleteVehicleType);
vehicleTypeRouter.get('/:vehicleTypeId/vehicles', getAllVehiclesByVehicleTypeId);
