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
});