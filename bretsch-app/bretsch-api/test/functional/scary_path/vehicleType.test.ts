import request from 'supertest';
import { VehicleType } from '../../../src/entity/VehicleType.entity';
import { Helper } from '../../helper';

const helper = new Helper();
helper.init();

describe('Tests for the VehicleType class Scary Path', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it('should not create a new vehicle type', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    // Not all necessary parameters are sent in the body
    request(helper.app)
      .post('/api/vehicletype')
      .send({
        pricePerMinute: 7,
        minimalBatteryLevel: 17,
        vehicles: [],
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

  // A nonexistent vehicletype id is used
  it('should not delete a vehicle type by id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const vehicleTypeId = 55;

    request(helper.app)
      .delete(`/api/vehicletype/${vehicleTypeId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, vehicleTypeCount] = await helper.getRepo(VehicleType).findAndCount();
        expect(vehicleTypeCount).toBe(2);
        done();
      });
  });

  // A nonexistent vehicletype id is used
  it('should not get specific vehicle type by id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const vehicleTypeId = 55;

    request(helper.app)
      .get(`/api/user/${vehicleTypeId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, vehicleTypeCount] = await helper.getRepo(VehicleType).findAndCount();
        expect(vehicleTypeCount).toBe(2);
        done();
      });
  });

  // A nonexistent user id is used
  it('should not get all vehicles by vehicle type', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const vehicleTypeId = 55;

    request(helper.app)
      .get(`/api/vehicletype/${vehicleTypeId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, vehicleTypeCount] = await helper.getRepo(VehicleType).findAndCount();
        expect(vehicleTypeCount).toBe(2);
        done();
      });
  });
  // A nonexistent user id is used
  it('should not update vehicle type by id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const vehicleTypeId = 55;

    request(helper.app)
      .patch(`/api/vehicletype/${vehicleTypeId}`)
      .send({
        firstName: 'user1 Update',
        birthDate: '10.10.1010',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, vehicleTypeCount] = await helper.getRepo(VehicleType).findAndCount();
        expect(vehicleTypeCount).toBe(2);
        done();
      });
  });
});
