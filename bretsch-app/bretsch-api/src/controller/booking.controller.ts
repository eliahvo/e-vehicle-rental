import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Booking } from "../entity/Booking.entity";
import { Vehicle } from "../entity/Vehicle.entity";
import { User } from "../entity/User.entity";

export const createBooking = async (req: Request, res: Response) => {
  const { startDate, endDate, paymentStatus, vehicleId, userId } = req.body;
  const booking = new Booking();
  const bookingRepository = await getRepository(Booking);
  const userRepository = await getRepository(User);
  const vehicleRepository = await getRepository(Vehicle);

  booking.startDate = startDate;
  booking.endDate = endDate;
  booking.paymentStatus = paymentStatus;

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

  res.send({ data: createdBooking });
};

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

export const getAllBooking = async (res: Response) => {
  const bookingRepository = await getRepository(Booking);
  const bookings = await bookingRepository.find({
    relations: ["user", "vehicle"],
  });
  res.send({ data: bookings });
};

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

export const updateBooking = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const { endDate } = req.body;
  const bookingRepository = await getRepository(Booking);

  try {
    let foundBooking = await bookingRepository.findOneOrFail({
      relations: ["user", "vehicle"],
      where: { bookingId: bookingId },
    });
    foundBooking.endDate = endDate;

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
