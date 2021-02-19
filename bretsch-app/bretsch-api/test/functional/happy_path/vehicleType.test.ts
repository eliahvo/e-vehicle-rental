import request from 'supertest';
import { VehicleType } from '../../../src/entity/VehicleType.entity';
import { Helper } from '../../helper';

const helper = new Helper();
helper.init();

describe('Tests for the VehicleType class', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it('it should create new vehicle type', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .post('/api/vehicletype')
      .send({
        type: 'Scooter',
        pricePerMinute: 7,
        minimalBatteryLevel: 17,
        vehicles: [],
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(201)
      .end(async (err, res) => {
        if (err) throw err;
        const [, vehiclyTypes] = await helper.getRepo(VehicleType).findAndCount();
        expect(vehiclyTypes).toBe(3);
        expect(res.body.data.type).toBe('Scooter');
        expect(res.body.data.pricePerMinute).toBe(7);
        expect(res.body.data.minimalBatteryLevel).toBe(17);
        done();
      });
  });

  it('should delete a vehicle type by id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    let vehicleType = new VehicleType();
    vehicleType = await helper.getRepo(VehicleType).findOneOrFail({ vehicleTypeId: 1 });
    request(helper.app)
      .delete(`/api/vehicletype/${vehicleType.vehicleTypeId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .end(async (err) => {
        if (err) throw err;
        const [, vehicleTypeCount] = await helper.getRepo(VehicleType).findAndCount();
        expect(vehicleTypeCount).toBe(1);
        done();
      });
  });

  it('should get specific type by id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const vehicletype = new VehicleType();
    vehicletype.type = 'Bike';
    vehicletype.pricePerMinute = 8;
    vehicletype.minimalBatteryLevel = 19;
    const savedVehicleType = await helper.getRepo(VehicleType).save(vehicletype);
    request(helper.app)
      .get(`/api/vehicletype/${savedVehicleType.vehicleTypeId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.type).toBe('Bike');
        done();
      });
  });

  it('should get all vehicle types', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .get('/api/vehicletype')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[1].type).toBe('car');
        done();
      });
  });

  it('should get all vehicles by vehicle type id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const vehicleTypeId = 2;
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .get(`/api/vehicletype/${vehicleTypeId}/vehicles`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].licencePlate).toBe('DA-BR-002');
        done();
      });
  });

  it('should update a vehicle type by id', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    let vehicleType = new VehicleType();
    vehicleType = await helper.getRepo(VehicleType).findOneOrFail({ vehicleTypeId: 1 });
    request(helper.app)
      .patch(`/api/vehicletype/${vehicleType.vehicleTypeId}`)
      .send({
        type: 'plane',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.type).toBe('plane');
        done();
      });
  });
});
