import { Helper } from '../../helper';
import request from 'supertest';

const helper = new Helper();
helper.init();

describe('Tests for the User class Scary Path', () => {
	const helper = new Helper();

	beforeAll(async () => {
		await helper.init();
	});

	afterAll(async () => {
		await helper.shutdown();
    });

    it('createUser Test Scary Path', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.post('/api/user')
			.send({
				email: 'userTest@bretsch.eu',
                hashedPassword: 'bretschTest',
                userRole: 'admin',
                firstName: 'user Test',
                preferedPayment: 'PayPal',
                streetPlusNumber: 'H-DA 2020',
                city: 'Darmstadt'
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(400)
			.end(async (err, res) => {
				if (err) throw err;
				expect(res.body.status).toBe('Error: Parameter missing!');
				done();
			});
	});
});