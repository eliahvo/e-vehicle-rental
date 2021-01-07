import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Booking } from "../entity/Booking.entity";
import { Vehicle } from "../entity/Vehicle.entity";
import { User } from "../entity/User.entity";

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
  const { startDate, endDate, paymentStatus, price, vehicleId, userId } = req.body;
  const booking = new Booking();
  const bookingRepository = await getRepository(Booking);
  const userRepository = await getRepository(User);
  const vehicleRepository = await getRepository(Vehicle);

  booking.startDate = startDate;
  booking.endDate = endDate;
  booking.paymentStatus = paymentStatus;
  booking.price = price;

  try {
    const foundUser = await userRepository.findOneOrFail({
      where: { userId: userId },
    });
    booking.user = foundUser;
  } catch (error) {
    res.status(404).send({ status: "not_found" });
    return;
  }
  try {
    const foundVehicle = await vehicleRepository.findOneOrFail({
      where: { vehicleId: vehicleId },
    });
    booking.vehicle = foundVehicle;
  } catch (error) {
    res.status(404).send({ status: "not_found" });
    return;
  }
  const createdBooking = await bookingRepository.save(booking);

  res.status(200).send({ data: createdBooking });
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
    res.status(404).send({ status: "not_found" });
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
    relations: ["user", "vehicle"],
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
  const bookingRepository = await getRepository(Booking);

  try {
    const foundBooking = bookingRepository.findOneOrFail({
      relations: ["user", "vehicle"],
      where: { bookingId: bookingId },
    });
    res.send({ data: foundBooking });
  } catch (error) {
    res.status(404).send({ status: "not_found" });
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
  const { endDate, price } = req.body;
  const bookingRepository = await getRepository(Booking);

  try {
    let foundBooking = await bookingRepository.findOneOrFail({
      relations: ["user", "vehicle"],
      where: { bookingId: bookingId },
    });
    foundBooking.endDate = endDate;
    foundBooking.price = price;
    foundBooking = await bookingRepository.save(foundBooking);

    res.send({
      data: foundBooking,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};
