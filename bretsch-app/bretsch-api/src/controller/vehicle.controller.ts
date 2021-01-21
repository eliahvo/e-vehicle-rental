import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Vehicle } from '../entity/Vehicle.entity';
import { VehicleType } from '../entity/VehicleType.entity';

// to have consistent values for the status
enum vehicle_status {
  Used,
  Free,
  Not_available,
  Reserved,
}

/**
 * Create vehicle
 * Method: POST
 * Expected as a parameter: ---
 * Expected in the body:licencePlate,
 *                      status,
 *                      positionLongitude,
 *                      positionLatitude,
 *                      batteryLevel,
 *                      vehicleType
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const createVehicle = async (req: Request, res: Response) => {
  const {
    licencePlate,
    status,
    positionLongitude,
    positionLatitude,
    batteryLevel,
    vehicleType,
  } = req.body;
  if (!licencePlate || !status || !batteryLevel || !vehicleType) {
    res.status(400).send({
      status: 'Error: Missing parameter!',
    });
    return;
  }
  const vehicle = new Vehicle();
  // because of enum
  if (!isNaN(status) && status > 0 && status < 4) {
    vehicle.status = vehicle_status[status].toString();
  } else {
    res.status(400).send({
      status: 'Error: Parameter status is wrong',
    });
    return;
  }
  vehicle.licencePlate = licencePlate;
  const positions = randomLocationGenerate();
  // tslint:disable-next-line:prefer-conditional-expression
  if (!positionLongitude) {
    vehicle.positionLongitude = positions[0].toString();
  } else {
    vehicle.positionLongitude = positionLongitude;
  }
  // tslint:disable-next-line:prefer-conditional-expression
  if (!positionLatitude) {
    vehicle.positionLatitude = positions[1].toString();
  } else {
    vehicle.positionLatitude = positionLatitude;
  }
  vehicle.batteryLevel = batteryLevel;
  // VehicleType by Id
  const repVehicleType = await getRepository(VehicleType);
  try {
    vehicle.vehicleType = await repVehicleType.findOneOrFail({
      where: { vehicleTypeId: vehicleType },
    });
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

/**
 * Delete Vehicle
 * Method: DELETE
 * Expected as a parameter: vehicleId
 * Expected in the body: ---
 * @param {Request} req Request
 * @param {Response} res Response
 */
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

/**
 * Get all bookings by vehicle Id
 * Method: GET
 * Expected as a parameter: vehicleId
 * Expected in the body: ---
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getAllBookingsByVehicleId = async (
  req: Request,
  res: Response
) => {
  const vehicleId = req.params.vehicleId;
  const vehicleRep = await getRepository(Vehicle);
  try {
    const vehicle = await vehicleRep.findOneOrFail(vehicleId, {
      relations: ['bookings'],
    });
    res.send({
      data: vehicle.bookings,
    });
  } catch (e) {
    res.status(404).send({
      status: 'Vehicle_not_found',
    });
  }
};

/**
 * Get all Vehicles
 * Method: GET
 * Expected as a parameter: ---
 * Expected in the body: ---
 * @param {Request} req Request
 * @param {Response} res Response
 */
// tslint:disable-next-line:variable-name
export const getAllVehicle = async (_req: Request, res: Response) => {
  const vehicleRep = getRepository(Vehicle);
  const vehicles = await vehicleRep.find({
    relations: ['bookings', 'vehicleType'],
  });

  res.status(200).send({
    data: vehicles,
  });
};

/**
 * Get specific vehicle
 * Method: GET
 * Expected as a parameter: vehicleId
 * Expected in the body: ---
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getSpecificVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  const vehicleRep = getRepository(Vehicle);

  try {
    const vehicle = await vehicleRep.findOneOrFail(vehicleId, {
      relations: ['bookings', 'vehicleType'],
    });
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

/**
 * Update Vehicle
 * Method: PATCH
 * Expected as a parameter: vehicleId;
 * Expected in the body: at least one of the following
 *                    licencePlate,
 *                    status,
 *                    positionLongitude,
 *                    positionLatitude,
 *                    batteryLevel,
 *                    vehicleType
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  const {
    licencePlate,
    status,
    positionLongitude,
    positionLatitude,
    batteryLevel,
    vehicleType,
  } = req.body;
  const vehicleRep = getRepository(Vehicle);
  try {
    // actual vehicle
    const vehicle = await vehicleRep.findOneOrFail(vehicleId, {
      relations: ['bookings', 'vehicleType'],
    });
    vehicle.licencePlate = licencePlate;
    vehicle.status = status;
    const positions = randomLocationGenerate();
    if (!positionLongitude) {
      vehicle.positionLongitude = positions[0].toString();
    } else {
      vehicle.positionLongitude = positionLongitude;
    }
    if (!positionLatitude) {
      vehicle.positionLatitude = positions[1].toString();
    } else {
      vehicle.positionLatitude = positionLatitude;
    }

    // because of enum
    if (status && !isNaN(status) && status > 0 && status < 4) {
      vehicle.status = vehicle_status[status].toString();
    } else {
      res.status(400).send({
        status: 'Error: Parameter status is wrong',
      });
      return;
    }

    vehicle.batteryLevel = batteryLevel;
    if (vehicleType) {
      // get update wanted VehicleType
      const repVehicleType = await getRepository(VehicleType);
      try {
        vehicle.vehicleType = await repVehicleType.findOneOrFail({
          where: { vehicleTypeId: vehicleType },
        });
      } catch (error) {
        res.status(404).send({ status: 'Vehicle Type not_found' });
        return;
      }
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

function randomLocationGenerate() {
  const positionLongitude = 8.63 + Math.random() * 0.046;
  const positionLatitude = 49.855 + Math.random() * 0.031;

  const positions = [positionLongitude, positionLatitude];
  return positions;
}
