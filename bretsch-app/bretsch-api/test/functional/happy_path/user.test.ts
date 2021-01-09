import { Helper } from '../../helper';
import request from 'supertest';
import { User } from '../../../src/entity/User.entity';

const helper = new Helper();
helper.init();

describe('Tests for the User class', () => {
	const helper = new Helper();

	beforeAll(async () => {
		await helper.init();
	});

	afterAll(async () => {
		await helper.shutdown();
    });

    it('createUser Test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.post('/api/user')
			.send({
				email: 'userTest@bretsch.eu',
                hashedPassword: 'bretschTest',
                userRole: 'admin',
                firstName: 'user Test',
                lastName: 'bretsch Test',
                birthDate: '10.10.10',
                preferedPayment: 'PayPal',
                streetPlusNumber: 'H-DA 2020',
                city: 'Darmstadt'
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, user] = await helper.getRepo(User).findAndCount();
				expect(user).toBe(4);
				expect(res.body.data.firstName).toBe('user Test');
                expect(res.body.data.preferedPayment).toBe('PayPal');
                expect(res.body.data.email).toBe('userTest@bretsch.eu');
				done();
			});
    });
    /*
     * If bookings are also deleted, this test works 
     *
    it('deleteUser Test', async (done) => {
		await helper.resetDatabase();
        await helper.loadFixtures();

        let user = new User();
        try{
            user = await helper.getRepo(User).findOneOrFail({userId:2});
        }catch(error){
            console.log(`The User with userId: ${user.userId}, could not be found`)
        }

		request(helper.app)
			.delete(`/api/user/${user.userId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err) => {
				if (err) throw err;
				const [, user] = await helper.getRepo(User).findAndCount();
				expect(user).toBe(2);
				done();
			});
    });
     *
     */

    it('getAllUser Test', async (done) => {
		await helper.resetDatabase();
        await helper.loadFixtures();
        
		request(helper.app)
			.get(`/api/user`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, user] = await helper.getRepo(User).findAndCount();
                expect(user).toBe(3);
                expect(res.body.data.length).toBe(3);
				expect(res.body.data[0].firstName).toBe('user1');
                //expect(res.body.data[1].birthDate).toBe('11.11.11');
                //expect(res.body.data[2].email).toBe('user3@bretsch.eu');
				done();
			});
    });

    it('getBookingsByUserId Test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

        let user = new User();
        try{
            user = await helper.getRepo(User).findOneOrFail({userId:3});
        }catch(error){
            console.log(`The User with userId: ${user.userId}, could not be found`)
        }
		request(helper.app)
			.get(`/api/user/${user.userId}/bookings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
            .end((err, res) => {
				if (err) throw err;
				expect(res.body.data.length).toBe(1);
                expect(res.body.data[0].bookingId).toBe(3);
                expect(res.body.data[0].price).toBe(30);
                expect(res.body.data[0].paymentStatus).toBe('not payed');
				done();
			});
    });

    
    it('getSpecificUser Test', async (done) => {
		await helper.resetDatabase();
        await helper.loadFixtures();
        
        let user = new User();
        try{
            user = await helper.getRepo(User).findOneOrFail({userId:3});
        }catch(error){
            console.log(`The User with userId: ${user.userId}, could not be found`)
        }

		request(helper.app)
			.get(`/api/user/${user.userId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, user] = await helper.getRepo(User).findAndCount();
                expect(user).toBe(3);
				expect(res.body.data.firstName).toBe('user3');
                expect(res.body.data.preferedPayment).toBe('PayPal');
                expect(res.body.data.email).toBe('user3@bretsch.eu');
                expect(res.body.data.bookings[0].bookingId).toBe(3);
				done();
			});
    });
    
    it('updateUser Test', async (done) => {
		await helper.resetDatabase();
        await helper.loadFixtures();
        
        let user = new User();
        try{
            user = await helper.getRepo(User).findOneOrFail({userId:1});
        }catch(error){
            console.log(`The User with userId: ${user.userId}, could not be found`)
        }

		request(helper.app)
            .patch(`/api/user/${user.userId}`)
            .send({
				firstName: 'user1 Update',
                birthDate: '10.10.1010'
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, user] = await helper.getRepo(User).findAndCount();
                expect(user).toBe(3);
				expect(res.body.data.firstName).toBe('user1 Update');
                expect(res.body.data.birthDate).toBe('10.10.1010');
				done();
			});
    });

});