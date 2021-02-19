import request from 'supertest';
import { Booking } from '../../../src/entity/Booking.entity';
import { Helper } from '../../helper';

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

  it('Should not create Booking for missing param', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
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
      .set('Authorization', authToken)
      .expect(400)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('Error: Parameter missing!');
        done();
      });
  });

  it('Should not create Booking with missing vehicle', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .post('/api/booking')
      .send({
        startDate: new Date(),
        endDate: new Date(),
        paymentStatus: 'payed',
        price: 1234,
        vehicleId: 5,
        userId: 1,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, booking] = await helper.getRepo(Booking).findAndCount();
        expect(booking).toBe(3);
        done();
      });
  });

  // A nonexistent Booking id is used
  it('Should not delete Booking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const bookingId = 55;

    request(helper.app)
      .delete(`/api/user/${bookingId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, booking] = await helper.getRepo(Booking).findAndCount();
        expect(booking).toBe(3);
        done();
      });
  });

  // A nonexistent Booking id is used
  it('Should not get Specific Booking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const bookignId = 55;

    request(helper.app)
      .get(`/api/booking/${bookignId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, booking] = await helper.getRepo(Booking).findAndCount();
        expect(booking).toBe(3);
        done();
      });
  });

  // A nonexistent booking id is used
  it('Should not update Booking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const bookingId = 55;

    request(helper.app)
      .patch(`/api/user/${bookingId}`)
      .send({
        price: 420,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, booking] = await helper.getRepo(Booking).findAndCount();
        expect(booking).toBe(3);
        done();
      });
  });
});
