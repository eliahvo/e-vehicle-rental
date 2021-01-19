import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";
import { Authentication } from "../middleware/authentication";

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
  const {
    email,
    password,
    firstName,
    lastName,
    birthDate,
    preferedPayment,
    streetPlusNumber,
    city,
  } = req.body;
  const userRepository = getRepository(User);
  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !birthDate ||
    !preferedPayment ||
    !streetPlusNumber ||
    !city
  ) {
    return res.status(400).send({
      status: "Error: Parameter missing!",
    });
  }

  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).send({
      status: "bad_request",
    });
  }

  // Generate hashed password
  const hashedPassword: string = await Authentication.hashPassword(password);

  const newUser = new User();

  user.email = email;
  user.hashedPassword = hashedPassword;
  user.firstName = firstName;
  user.lastName = lastName;
  user.birthDate = birthDate;
  user.preferedPayment = preferedPayment;
  user.streetPlusNumber = streetPlusNumber;
  user.city = city;

  const createdUser = await userRepository.save(newUser);
  delete createdUser.hashedPassword;

  return res.status(200).send({
    data: createdUser,
  });
};


export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const userRepository = await getRepository(User);
	// Check if user exists
	const user = await userRepository.findOne({
	  select: ['hashedPassword', 'email', 'firstName','lastName', 'userId'],
	  where: {
		email,
	  },
	});
  
	if (!user) {
	  return res.status(401).send({ status: 'unauthorized' });
	}
  
	const matchingPasswords: boolean = await Authentication.comparePasswordWithHash(password, user.hashedPassword);
	if (!matchingPasswords) {
	  return res.status(401).send({ status: 'unauthorized' });
	}
  
	const token: string = await Authentication.generateToken({
	  email: user.email,
	  id: user.userId.toString(),
	  name: user.firstName,
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
      status: "Error: " + error,
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
  const users = await userRepository.find();

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
      relations: ["bookings"],
    });
    const userBookingList = user.bookings;
    res.status(200).send({
      data: userBookingList,
    });
  } catch (error) {
    res.status(404).send({
      status: "Error: " + error,
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
      relations: ["bookings"],
    });
    res.status(200).send({
      data: user,
    });
  } catch (error) {
    res.status(404).send({
      status: "Error: " + error,
    });
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
    hashedPassword,
    firstName,
    lastName,
    birthDate,
    preferedPayment,
    streetPlusNumber,
    city,
  } = req.body;
  const userRepository = getRepository(User);

  try {
    let user = await userRepository.findOneOrFail(userId, {
      relations: ["bookings"],
    });
    user.email = email;
    user.hashedPassword = hashedPassword;
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;
    user.preferedPayment = preferedPayment;
    user.streetPlusNumber = streetPlusNumber;
    user.city = city;

    user = await userRepository.save(user);

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    res.status(404).send({
      status: "Error: " + error,
    });
  }
};
