import { Helper } from '../../helper';
import request from 'supertest';
import { Booking } from '../../../src/entity/Booking.entity';

const helper = new Helper();
helper.init();

describe('Tests for the Booking class Scary Path', () => {
	const helper = new Helper();

	beforeAll(async () => {
		await helper.init();
	});

	afterAll(async () => {
		await helper.shutdown();
    });

    it('createBooking Test Scary Path for missing param', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.post('/api/booking')
			.send({
				startDate: new Date(),
                endDate: new Date(),
                price: 1234,
                vehicleId: 1,
                userId: 1,
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

    it('createBooking Test Scary Path for missing vehicle', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.post('/api/booking')
			.send({
				startDate: new Date(),
                endDate: new Date(),
                paymentStatus: "payed",
                price: 1234,
                vehicleId: 5,
                userId: 1,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end(async (err, res) => {
				if (err) throw err;
				expect(res.body.status).toBe('not_found');
				done();
			});
    });

        //A nonexistent Booking id is used
        it('deleteBooking Test Scary Path', async (done) => {
            await helper.resetDatabase();
            await helper.loadFixtures();
    
            const bookingId = 55; 
    
            request(helper.app)
                .delete(`/api/user/${bookingId}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(404)
                .end(async (err ) => {
                    if (err) throw err;
                    const [, booking] = await helper.getRepo(Booking).findAndCount();
                    expect(booking).toBe(3);
                    done();
                });
        });
        
           //A nonexistent Booking id is used
           it('getSpecificBooking Test Scary Path', async (done) => {
            await helper.resetDatabase();
            await helper.loadFixtures();
    
            const bookignId = 55; 
    
            request(helper.app)
                .get(`/api/booking/${bookignId}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(404)
                .end(async (err) => {
                    if (err) throw err;
                    const [, booking] = await helper.getRepo(Booking).findAndCount();
                    expect(booking).toBe(3);
                    done();
                });
        });       
        
        //A nonexistent booking id is used
        it('updateBooking Test Scary Path', async (done) => {
            await helper.resetDatabase();
            await helper.loadFixtures();
    
            const bookingId = 55; 
    
            request(helper.app)
                .patch(`/api/user/${bookingId}`)
                .send({
                    price: 420,
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(404)
                .end(async (err) => {
                    if (err) throw err;
                    const [, booking] = await helper.getRepo(Booking).findAndCount();
                    expect(booking).toBe(3);
                    done();
                });
        });

});