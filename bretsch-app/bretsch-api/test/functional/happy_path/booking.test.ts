import request from 'supertest';
import { Booking } from '../../../src/entity/Booking.entity';
import { Helper } from '../../helper';

const helper = new Helper();
helper.init();

describe('Tests for the Booking class', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it('Should create Booking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .post('/api/booking')
      .send({
        startDate: new Date(),
        paymentStatus: 'payed',
        vehicleId: 1,
        userId: 1,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(201)
      .end(async (err, res) => {
        if (err) throw err;
        const [, booking] = await helper.getRepo(Booking).findAndCount();
        expect(booking).toBe(4);
        expect(res.body.data.paymentStatus).toBe('payed');
        done();
      });
  });

  it('Should delete Booking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .delete('/api/booking/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end(async (err) => {
        if (err) throw err;
        const [, booking] = await helper.getRepo(Booking).findAndCount();
        expect(booking).toBe(2);
        done();
      });
  });

  it('Should get all Bookings', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .get(`/api/booking`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        const [, booking] = await helper.getRepo(Booking).findAndCount();
        expect(booking).toBe(3);
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].price).toBe('1.00');
        expect(res.body.data[1].vehicle.vehicleId).toBe(2);
        expect(res.body.data[2].user.userId).toBe(3);
        done();
      });
  });

  it('Should get Specific Booking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    let booking = new Booking();
    try {
      booking = await helper.getRepo(Booking).findOneOrFail({ bookingId: 3 });
    } catch (error) {
      console.log(`The Booking with bookingId: ${booking.bookingId}, could not be found`);
    }
    request(helper.app)
      .get(`/api/booking/${booking.bookingId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.bookingId).toBe(3);
        expect(res.body.data.price).toBe('1.00');
        expect(res.body.data.paymentStatus).toBe('payed');
        done();
      });
  });

  it('Should update Booking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    let booking = new Booking();
    try {
      booking = await helper.getRepo(Booking).findOneOrFail({ bookingId: 1 });
    } catch (error) {
      console.log(`The Booking with bookingId: ${booking.bookingId}, could not be found`);
    }

    request(helper.app)
      .patch(`/api/booking/${booking.bookingId}`)
      .send({
        price: 69,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        const [, booking] = await helper.getRepo(Booking).findAndCount();
        expect(booking).toBe(3);
        expect(res.body.data.price).toBe(69);
        done();
      });
  });
});
