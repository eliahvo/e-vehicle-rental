import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Booking } from '../entity/Booking.entity';
import { User } from '../entity/User.entity';
import { Authentication } from '../middleware/authentication';

/**
 * Create User
 * Method: post
 * Expected as a parameter: ---
 * Expected in the body:
 *                      email,
 *                      hashedPassword,
 *                      firstName,
 *                       lastName,
 *                       birthDate,
 *                       preferedPayment,
 *                       streetPlusNumber,
 *                       city
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, birthDate, preferedPayment, streetPlusNumber, city } = req.body;
  const userRepository = getRepository(User);
  if (!email || !password || !firstName || !lastName || !birthDate || !preferedPayment || !streetPlusNumber || !city) {
    return res.status(400).send({
      status: 'Error: Parameter missing!',
    });
  }

  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).send({
      status: 'bad_request',
    });
  }

  // Generate hashed password
  const hashedPassword: string = await Authentication.hashPassword(password);

  const newUser = new User();

  newUser.email = email;
  newUser.hashedPassword = hashedPassword;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.birthDate = birthDate;
  newUser.preferedPayment = preferedPayment;
  newUser.streetPlusNumber = streetPlusNumber;
  newUser.city = city;
  newUser.userRole = 'user';

  const createdUser = await userRepository.save(newUser);
  delete createdUser.hashedPassword;

  return res.status(201).send({
    data: createdUser,
  });
};

export const validatePassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = await getRepository(User);

  // Check if user exists
  const user = await userRepository.findOne({
    select: ['hashedPassword', 'email'],
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(404).send({ status: 'user not found' });
  }

  const matchingPasswords: boolean = await Authentication.comparePasswordWithHash(password, user.hashedPassword);
  if (!matchingPasswords) {
    return res.status(401).send();
  }
  return res.status(200).send();
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = await getRepository(User);
  // Check if user exists
  const user = await userRepository.findOne({
    select: ['hashedPassword', 'email', 'firstName', 'lastName', 'userId', 'userRole'],
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).send({ status: 'unauthorized1' });
  }

  const matchingPasswords: boolean = await Authentication.comparePasswordWithHash(password, user.hashedPassword);
  if (!matchingPasswords) {
    return res.status(401).send({ status: 'unauthorized2' });
  }

  const token: string = await Authentication.generateToken({
    email: user.email,
    id: user.userId.toString(),
    name: user.firstName,
    role: user.userRole,
  });

  return res.send({
    data: token,
  });
};

/**
 * Delete User based on the userId
 * Method: delete
 * Expected as a parameter: userId
 * Expected in the body: ---
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOneOrFail(userId);
    await userRepository.remove(user);
    res.status(200).send({});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Get All User
 * Method: get
 * Expected as a parameter: ---
 * Expected in the body: ---
 * @param {Response}res Response
 */
export const getAllUser = async (_: Request, res: Response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    relations: ['bookings'],
  });

  res.status(200).send({
    data: users,
  });
};

/**
 * Get all Bokkings from a specific User
 * Method: get
 * Expected as a parameter: userId
 * Expected in the body: ---
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getBookingsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOneOrFail(userId, {
      relations: ['bookings', 'bookings.vehicle', 'bookings.vehicle.vehicleType'],
    });
    const userBookingList = user.bookings;
    res.status(200).send({
      data: userBookingList,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Receives a User based on the userId
 * Method: get
 * Expected as a parameter: userId
 * Expected in the body: ---
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getSpecificUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOneOrFail(userId, {
      relations: ['bookings', 'actualBooking'],
    });
    res.status(200).send({
      data: user,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Checks whether an account with that mail already exists or not
 * Method: get
 * Expected as a parameter: email
 * Expected in the body: ---
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const checkMailExists = async (req: Request, res: Response) => {
  const email = req.params.email;
  const userRepository = getRepository(User);

  try {
    await userRepository.findOneOrFail({ where: { email } });
    res.status(200).send();
  } catch (error) {
    res.status(404).send();
  }
};

/**
 * Update a User based on the userId
 * Method: patch
 * Expected as a parameter: userId
 * Expected in the body (at least one parameter):
 * *                                            email,
 *                                              hashedPassword,
 *                                              firstName,
 *                                              lastName,
 *                                              birthDate,
 *                                              preferedPayment,
 *                                              streetPlusNumber,
 *                                              city
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const {
    email,
    password,
    userRole,
    firstName,
    lastName,
    birthDate,
    preferedPayment,
    streetPlusNumber,
    city,
    actualBookingId,
  } = req.body;
  const userRepository = getRepository(User);

  try {
    let user = await userRepository.findOneOrFail(userId, {
      relations: ['bookings', 'actualBooking'],
    });
    user.email = email;
    user.userRole = userRole;
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;
    user.preferedPayment = preferedPayment;
    user.streetPlusNumber = streetPlusNumber;
    user.city = city;

    if (actualBookingId) {
      if (actualBookingId == -1) {
        user.actualBooking = null;
      } else {
        const bookingRepository = getRepository(Booking);

        const actualBooking = await bookingRepository.findOneOrFail(actualBookingId);
        user.actualBooking = actualBooking;
      }
    }

    if (password) {
      const hashedPassword: string = await Authentication.hashPassword(password);
      user.hashedPassword = hashedPassword;
    }

    user = await userRepository.save(user);

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
