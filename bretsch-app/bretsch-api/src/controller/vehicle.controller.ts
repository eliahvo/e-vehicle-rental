import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Vehicle } from '../entity/Vehicle.entity';
import { VehicleType } from '../entity/VehicleType.entity';

export const createVehicle = async (req: Request, res: Response) => {
  console.log('test');
  const { licencePlate, status, positionLongitude, positionLatitude, batteryLevel, vehicleType } = req.body;
  if (!licencePlate || !status || !positionLongitude || !positionLatitude || !batteryLevel || !vehicleType) {
    console.log('Hier');
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

  res.status(201).send({
    data: createdVehicle,
  });
};

export const deleteVehicle = () => {};

export const getAllBookingsByVehicleId = () => {};
export const getAllVehicle = () => {};

export const getSpecificVehicle = () => {};

export const updateVehicle = () => {};
