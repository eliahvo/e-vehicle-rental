
export const createUser = async (req, res) =>{
    const {email, hashedPassword, firstName, lastName, birthDate, preferedPayment,
        streetPlusNumber, city} = req.body;

    if (!email || !hashedPassword || !firstName || !lastName ||
        !birthDate || !preferedPayment || !streetPlusNumber || !city) {
		res.status(400).send({
			status: 'Error: Parameter fehlt!',
		});
		return;
	}
}
export const deleteUser = async (req, res) =>{

}
export const getAllUser = async (req, res) =>{

}
export const getSpecificUser = async (req, res) =>{

}
export const updateUser = async (req, res) =>{

}
export const getBookingsByUserId = async (req, res) =>{

}
