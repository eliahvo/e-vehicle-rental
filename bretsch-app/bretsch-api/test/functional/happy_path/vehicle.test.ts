import request from 'supertest';
import { Vehicle } from '../../../src/entity/Vehicle.entity';
import { Helper } from '../../helper';

const helper = new Helper();
helper.init();

describe('Tests for the Vehicle class', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it('should create a Vehicle', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .post('/api/vehicle')
      .send({
        status: 2,
        batteryLevel: 100,
        vehicleType: 2,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(201)
      .end(async (err, res) => {
        if (err) throw err;
        const [, vehicle] = await helper.getRepo(Vehicle).findAndCount();
        expect(vehicle).toBe(4);
        expect(res.body.data.licencePlate).toBe('DA-BR-' + vehicle);
        expect(res.body.data.status).toBe('Not_available');
        expect(res.body.data.positionLongitude).toBeDefined();
        expect(res.body.data.positionLatitude).toBeDefined();
        expect(res.body.data.batteryLevel).toBe(100);
        done();
      });
  });

  it('Should get all bookings from a Vehicle', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    let vehicle = new Vehicle();
    try {
      vehicle = await helper.getRepo(Vehicle).findOneOrFail({ vehicleId: 1 });
    } catch (error) {
      console.log(`The Vehicle with VehicleId: ${vehicle.vehicleId}, could not be found`);
    }
    request(helper.app)
      .get(`/api/Vehicle/${vehicle.vehicleId}/bookings`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data[0].bookingId).toBe(1);
        expect(res.body.data[0].price).toBe('1.00');
        done();
      });
  });

  it('Should delete a Vehicle', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .delete('/api/Vehicle/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end(async (err) => {
        if (err) throw err;
        const [, vehicle] = await helper.getRepo(Vehicle).findAndCount();
        expect(vehicle).toBe(2);
        done();
      });
  });

  it('Should get All Vehicles', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .get(`/api/Vehicle`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        const [, vehicle] = await helper.getRepo(Vehicle).findAndCount();
        expect(vehicle).toBe(3);
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].status).toBe('Free');
        expect(res.body.data[1].batteryLevel).toBe(80);
        expect(res.body.data[2].positionLatitude).toBe('49.866158');
        done();
      });
  });

  it('Should get a specific Vehicle', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    let vehicle = new Vehicle();
    try {
      vehicle = await helper.getRepo(Vehicle).findOneOrFail({ vehicleId: 3 });
    } catch (error) {
      console.log(`The Vehicle with VehicleId: ${vehicle.vehicleId}, could not be found`);
    }
    request(helper.app)
      .get(`/api/Vehicle/${vehicle.vehicleId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.vehicleId).toBe(3);
        expect(res.body.data.batteryLevel).toBe(20);
        expect(res.body.data.positionLatitude).toBe('49.866158');
        done();
      });
  });

  it('Should update a Vehicle', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    let vehicle = new Vehicle();
    try {
      vehicle = await helper.getRepo(Vehicle).findOneOrFail({ vehicleId: 1 });
    } catch (error) {
      console.log(`The Vehicle with VehicleId: ${vehicle.vehicleId}, could not be found`);
    }

    request(helper.app)
      .patch(`/api/Vehicle/${vehicle.vehicleId}`)
      .send({
        licencePlate: 'DA-IT-21',
        status: 2,
        batteryLevel: 100,
        vehicleType: 2,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        const [, vehicle] = await helper.getRepo(Vehicle).findAndCount();
        expect(vehicle).toBe(3);
        expect(res.body.data.batteryLevel).toBe(100);
        done();
      });
  });
});
