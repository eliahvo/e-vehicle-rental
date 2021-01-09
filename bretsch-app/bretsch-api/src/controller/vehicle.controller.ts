import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Vehicle } from '../entity/Vehicle.entity';
import { VehicleType } from '../entity/VehicleType.entity';

export const createVehicle = async (req: Request, res: Response) => {
  const { licencePlate, status, positionLongitude, positionLatitude, batteryLevel, vehicleType } = req.body;
  if (!licencePlate || !status || !positionLongitude || !positionLatitude || !batteryLevel || !vehicleType) {
    res.status(400).send({
      status: 'Error: Missing parameter!',
    });
    return;
  }
  const vehicle = new Vehicle();
  vehicle.licencePlate = licencePlate;
  vehicle.status = status;
  vehicle.positionLongitude = positionLongitude;
  vehicle.positionLatitude = positionLatitude;
  vehicle.batteryLevel = batteryLevel;
  console.log('Hier');
  // VehicleType by Id
  const repVehicleType = await getRepository(VehicleType);
  try {
    const vType = await repVehicleType.findOneOrFail({
      where: { vehicleTypeId: vehicleType },
    });
    vehicle.vehicleType = vType;
  } catch (error) {
    res.status(404).send({ status: 'Vehicle Type not_found' });
    return;
  }
  const vehicleRep = getRepository(Vehicle);
  const createdVehicle = await vehicleRep.save(vehicle);
// na du
  res.status(201).send({
    data: createdVehicle,
  });
};
// Hallo
export const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  const vehicleRepository = getRepository(Vehicle);
  try {
    const vehicle = await vehicleRepository.findOneOrFail(vehicleId);
    await vehicleRepository.remove(vehicle);
    res.status(204).send({});
  } catch (error) {
    res.status(404).send({
      // tslint:disable-next-line:prefer-template
      status: 'Error: ' + error,
    });
  }
};

export const getAllBookingsByVehicleId = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  const vehicleRep = await getRepository(Vehicle);
  try {
    const vehicle = await vehicleRep.find({
      where: { id: vehicleId },
      // tslint:disable-next-line:object-literal-sort-keys
      relations: ['bookings'],
    });
    if (vehicle == null) {
      res.status(404).send({
        status: 'vehicle_not_found',
      });
    } else {
      res.send({
        data: vehicle,
      });
    }
  } catch (e) {
    res.status(404).send({
      status: 'Vehicle_not_found',
    });
  }
};

export const getAllVehicle = () => {};

export const getSpecificVehicle = () => {};

export const updateVehicle = () => {};
