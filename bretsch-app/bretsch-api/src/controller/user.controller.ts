import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";

export const createUser = async (req: Request, res: Response) =>{

    const {email, hashedPassword, firstName, lastName, birthDate, preferedPayment,
        streetPlusNumber, city} = req.body;

    if (!email || !hashedPassword || !firstName || !lastName ||
        !birthDate || !preferedPayment || !streetPlusNumber || !city) {
		res.status(400).send({
			status: 'Error: Parameter fehlt!',
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

export const getAllUser = async (res: Response) =>{

    console.log("Test");
    const userRepository = getRepository(User);
    const users = await userRepository.find({ relations: ['bookings'] });

    res.status(200).send({ 
        data: users 
    });

};

export const getSpecificUser = async (req: Request, res: Response) =>{

    const userId = req.params.userId;
    const userRepository = getRepository(User);

	try {
		const user = await userRepository.findOneOrFail(userId);
		res.status(200).send({
			data: user,
		});
	} catch (error) {
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}

};
export const updateUser = async (req: Request, res: Response) =>{
    const userId = req.params.userId;
	const {email, hashedPassword, firstName, lastName, birthDate, preferedPayment,
        streetPlusNumber, city} = req.body;
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
export const getBookingsByUserId = async () =>{

};
