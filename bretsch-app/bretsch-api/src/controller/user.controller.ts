import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";

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
export const createUser = async (req: Request, res: Response) =>{

    const {
		email,
		hashedPassword,
		firstName,
		lastName,
		birthDate,
		preferedPayment,
        streetPlusNumber,
		city
		} = req.body;

	if (!email ||
		!hashedPassword ||
		!firstName ||
		!lastName ||
		!birthDate ||
		!preferedPayment ||
		!streetPlusNumber ||
		!city) {
		res.status(400).send({
			status: 'Error: Parameter missing!',
		});
		return;
    }
    
    const user = new User();

    user.email = email;
    user.hashedPassword = hashedPassword;
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;
    user.preferedPayment = preferedPayment;
    user.streetPlusNumber = streetPlusNumber;
    user.city = city;

    const userRepository = getRepository(User);
    const createdUser = await userRepository.save(user);

    res.status(200).send({
		data: createdUser,
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
export const deleteUser = async (req: Request, res: Response) =>{

    const userId = req.params.userId;
    const userRepository = getRepository(User);

    try {
		const user = await userRepository.findOneOrFail(userId);
		await userRepository.remove(user);
		res.status(200).send({

        });
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
export const getAllUser = async (_: Request, res: Response) =>{

    const userRepository = getRepository(User);
    const users = await userRepository.find();

    res.status(200).send({ 
        data: users 
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
export const getBookingsByUserId = async (req: Request, res: Response) =>{

    const userId = req.params.userId;
    const userRepository = getRepository(User);

	try {
		const user = await userRepository.findOneOrFail(userId, { relations: ['bookings'] });
		const userBookingList = user.bookings;
		res.status(200).send({
			 data: userBookingList
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
export const getSpecificUser = async (req: Request, res: Response) =>{

    const userId = req.params.userId;
    const userRepository = getRepository(User);

	try {
		const user = await userRepository.findOneOrFail(userId, { relations: ['bookings'] });
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
export const updateUser = async (req: Request, res: Response) =>{
    const userId = req.params.userId;
	const {
		email,
		hashedPassword,
		firstName,
		lastName,
		birthDate,
		preferedPayment,
        streetPlusNumber, 
		city
		} = req.body;
	const userRepository = getRepository(User);

	try {
		let user = await userRepository.findOneOrFail(userId);
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
			status: 'Error: ' + error,
		});
	}

};
