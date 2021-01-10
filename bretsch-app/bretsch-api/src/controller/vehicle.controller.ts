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
    const vehicle = await vehicleRep.findOneOrFail(vehicleId, { relations: ['bookings'] });
    res.send({
      data: vehicle.bookings,
    });
  } catch (e) {
    res.status(404).send({
      status: 'Vehicle_not_found',
    });
  }
};

// tslint:disable-next-line:variable-name
export const getAllVehicle = async (_req: Request, res: Response) => {
  const vehicleRep = getRepository(Vehicle);
  const vehicles = await vehicleRep.find({ relations: ['bookings', 'vehicleType'] });

  res.status(200).send({
    data: vehicles,
  });
};

export const getSpecificVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  const vehicleRep = getRepository(Vehicle);

  try {
    const vehicle = await vehicleRep.findOneOrFail(vehicleId, { relations: ['bookings', 'vehicleType'] });
    res.status(200).send({
      data: vehicle,
    });
  } catch (error) {
    res.status(404).send({
      // tslint:disable-next-line:prefer-template
      status: 'Error: ' + error,
    });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  const { licencePlate, status, positionLongitude, positionLatitude, batteryLevel, vehicleType } = req.body;
  if (!licencePlate || !status || !positionLongitude || !positionLatitude || !batteryLevel || !vehicleType) {
    res.status(400).send({
      status: 'Error: Missing parameter!',
    });
    return;
  }
  const vehicleRep = getRepository(Vehicle);

  try {
    const vehicle = await vehicleRep.findOneOrFail(vehicleId);
    vehicle.licencePlate = licencePlate;
    vehicle.status = status;
    vehicle.positionLongitude = positionLongitude;
    vehicle.positionLatitude = positionLatitude;
    vehicle.batteryLevel = batteryLevel;

    // get update wanted VehicleType
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

    const savedVehicle = await vehicleRep.save(vehicle);

    res.status(200).send({
      data: savedVehicle,
    });
  } catch (error) {
    res.status(404).send({
      // tslint:disable-next-line:prefer-template
      status: 'Error: ' + error,
    });
  }
};
