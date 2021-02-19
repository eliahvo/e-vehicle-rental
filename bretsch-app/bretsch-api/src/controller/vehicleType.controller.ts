import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { VehicleType } from '../entity/VehicleType.entity';

/**
 * Create VehicleType
 * Method: create
 * Expected as a parameter: ---
 * Expected in the body:
 *                      type,
 *                      startPrice,
 *                      pricePerMinute,
 *                      minimalBatteryLevel,
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const createVehicleType = async (req: Request, res: Response) => {
  const { type, startPrice, pricePerMinute, minimalBatteryLevel } = req.body;

  if (!type || !pricePerMinute || !pricePerMinute || !minimalBatteryLevel) {
    res.status(400).send({
      status: 'Error: Parameter missing!',
    });
    return;
  }

  const vehicleType = new VehicleType();

  vehicleType.type = type;
  vehicleType.startPrice = startPrice;
  vehicleType.pricePerMinute = pricePerMinute;
  vehicleType.minimalBatteryLevel = minimalBatteryLevel;

  const vehicleTypeRepository = getRepository(VehicleType);
  const createdVehicleType = await vehicleTypeRepository.save(vehicleType);

  res.status(201).send({
    data: createdVehicleType,
  });
};

/**
 * Delete VehicleType based on the vehicleTypeId
 * Method: delete
 * Expected as a parameter: vehicleTypeId
 * Expected in the body: ---
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const deleteVehicleType = async (req: Request, res: Response) => {
  const vehicleTypeId = req.params.vehicleTypeId;
  const vehicleTypeRepository = getRepository(VehicleType);

  try {
    const vehicleType = await vehicleTypeRepository.findOneOrFail(vehicleTypeId);
    await vehicleTypeRepository.remove(vehicleType);
    res.status(200).send({});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Get all vehicles from a specific vehicleType
 * Method: get
 * Expected as a parameter: vehicleTypeId
 * Expected in the body: ---
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getAllVehiclesByVehicleTypeId = async (req: Request, res: Response) => {
  const vehicleTypeId = req.params.vehicleTypeId;
  const vehicleTypeRepository = getRepository(VehicleType);

  try {
    const vehicleType = await vehicleTypeRepository.findOneOrFail(vehicleTypeId, { relations: ['vehicles'] });
    const vehicleList = vehicleType.vehicles;
    res.status(200).send({ data: vehicleList });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Get All VehicleTypes
 * Method: get
 * Expected as a parameter: ---
 * Expected in the body: ---
 * @param {Response}res Response
 */
export const getAllVehicleType = async (_: Request, res: Response) => {
  const vehicleTypeRepository = getRepository(VehicleType);
  const vehicleTypes = await vehicleTypeRepository.find({
    relations: ['vehicles'],
  });

  res.status(200).send({
    data: vehicleTypes,
  });
};

/**
 * Get a vehicleType based on the vehicleTypeId
 * Method: get
 * Expected as a parameter: vehicleTypeId
 * Expected in the body: ---
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getSpecificVehicleType = async (req: Request, res: Response) => {
  const vehicleTypeId = req.params.vehicleTypeId;
  const vehicleTypeRepository = getRepository(VehicleType);

  try {
    const vehicleType = await vehicleTypeRepository.findOneOrFail(vehicleTypeId, { relations: ['vehicles'] });
    res.status(200).send({
      data: vehicleType,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Update a vehicleType based on the vehicleTypeId
 * Method: patch
 * Expected as a parameter: vehicleTypeId
 * Expected in the body (at least one parameter):
 *                                              type,
 *                                              startPrice,
 *                                              pricePerMinute,
 *                                              minimalBatteryLevel,
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const updateVehicleType = async (req: Request, res: Response) => {
  const vehicleTypeId = req.params.vehicleTypeId;
  const { type, startPrice, pricePerMinute, minimalBatteryLevel } = req.body;
  const vehicleTypeRepository = getRepository(VehicleType);

  try {
    let vehicleType = await vehicleTypeRepository.findOneOrFail(vehicleTypeId);
    vehicleType.type = type;
    vehicleType.startPrice = startPrice;
    vehicleType.pricePerMinute = pricePerMinute;
    vehicleType.minimalBatteryLevel = minimalBatteryLevel;

    vehicleType = await vehicleTypeRepository.save(vehicleType);

    res.status(200).send({
      data: vehicleType,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
