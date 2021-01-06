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

export const deleteUser = async () =>{

};
export const getAllUser = async () =>{

};

export const getSpecificUser = async () =>{

};
export const updateUser = async () =>{

};
export const getBookingsByUserId = async () =>{

};
