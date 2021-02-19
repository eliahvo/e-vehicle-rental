import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Booking } from '../entity/Booking.entity';
import { User } from '../entity/User.entity';
import { Vehicle } from '../entity/Vehicle.entity';

/**
 * Create Booking
 * Method: POST
 * Expected as a parameter: ---
 * Expected in the body:
 *                      startDate,
 *                      endDate,
 *                      paymentStatus,
 *                      price,
 *                      vehicleId,
 *                      userId
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const createBooking = async (req: Request, res: Response) => {
  const { startDate, paymentStatus, vehicleId, userId } = req.body;
  const booking = new Booking();
  const bookingRepository = await getRepository(Booking);
  const userRepository = await getRepository(User);
  const vehicleRepository = await getRepository(Vehicle);

  if (!startDate || !paymentStatus || !vehicleId || !userId) {
    res.status(400).send({ status: 'Error: Parameter missing!' });
    return;
  }

  booking.startDate = startDate;
  booking.paymentStatus = paymentStatus;

  try {
    const foundUser = await userRepository.findOneOrFail({
      where: { userId },
    });
    booking.user = foundUser;
  } catch (error) {
    res.status(404).send({ status: 'Error: ' + error });
    return;
  }
  try {
    const foundVehicle = await vehicleRepository.findOneOrFail({
      where: { vehicleId },
    });
    booking.vehicle = foundVehicle;
  } catch (error) {
    res.status(404).send({ status: 'Error: ' + error });
    return;
  }
  const createdBooking = await bookingRepository.save(booking);

  res.status(201).send({ data: createdBooking });
};

/**
 * Delete Booking
 * Method: DELETE
 * Expected as a parameter: bookingId
 * Expected in the body: ---
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const deleteBooking = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const bookingRepository = await getRepository(Booking);

  try {
    const foundBooking = await bookingRepository.findOneOrFail(bookingId);
    await bookingRepository.remove(foundBooking);
    res.send({});
  } catch (error) {
    res.status(404).send({ status: 'Error: ' + error });
  }
};

/**
 * Get all bookings
 * Method: GET
 * Expected as a parameter: ---
 * Expected in the body: ---
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getAllBookings = async (_: Request, res: Response) => {
  const bookingRepository = await getRepository(Booking);
  const bookings = await bookingRepository.find({
    relations: ['user', 'vehicle'],
  });
  res.status(200).send({ data: bookings });
};

/**
 * Get booking by id
 * Method: GET
 * Expected as a parameter: bookingId
 * Expected in the body: ---
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getSpecificBooking = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const bookingRepository = getRepository(Booking);

  try {
    const foundBooking = await bookingRepository.findOneOrFail({
      relations: ['vehicle', 'user', 'vehicle.vehicleType'],
      where: { bookingId },
    });
    res.status(200).send({
      data: foundBooking,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Update Booking
 * Method: PATCH
 * Expected as a parameter: bookingId;
 * Expected in the body: at least one of the following
 *                      endDate,
 *                      price
 *
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const updateBooking = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const { endDate, price, paymentStatus } = req.body;
  const bookingRepository = await getRepository(Booking);

  try {
    let foundBooking = await bookingRepository.findOneOrFail({
      relations: ['user', 'vehicle'],
      where: { bookingId },
    });
    foundBooking.endDate = endDate;
    foundBooking.price = price;
    foundBooking.paymentStatus = paymentStatus;
    foundBooking = await bookingRepository.save(foundBooking);

    res.send({
      data: foundBooking,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
