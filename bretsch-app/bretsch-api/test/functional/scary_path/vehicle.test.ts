import { Helper } from '../../helper';
import request from 'supertest';
import { Vehicle } from '../../../src/entity/Vehicle.entity';

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

    it('should not create a Vehicle', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.post('/api/Vehicle')
			.send({
                licencePlate: "TestLicensePlate",
                status: "free",
                batteryLevel: 100,
                

			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(400)
			.end(async (err, res) => {
				if (err) throw err;
				expect(res.body.status).toBe("Error: Missing parameter!");
				done();
			});
    });
    
    it('Should not delete a Vehicle', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.delete('/api/Vehicle/5')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end(async (err) => {
                if (err) throw err;
                const [, vehicleCount] = await helper
                .getRepo(Vehicle)
                .findAndCount();
                expect(vehicleCount).toBe(3);
				done();
			});
    });

    it('Should not get a specific Vehicle', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

        let vehicle = new Vehicle();
        try{
            vehicle = await helper.getRepo(Vehicle).findOneOrFail({vehicleId:5});
        }catch(error){
            console.log(`The Vehicle with VehicleId: ${vehicle.vehicleId}, could not be found`)
        }
		request(helper.app)
			.get(`/api/Vehicle/${vehicle.vehicleId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
            .end((err) => {
				if (err) throw err;
				done();
			});
	});

	it('Should not get all bookings from a Vehicle', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

        let vehicle = new Vehicle();
        try{
            vehicle = await helper.getRepo(Vehicle).findOneOrFail({vehicleId:5});
        }catch(error){
            console.log(`The Vehicle with VehicleId: ${vehicle.vehicleId}, could not be found`)
        }
		request(helper.app)
			.get(`/api/Vehicle/${vehicle.vehicleId}/bookings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
            .end((err) => {
				if (err) throw err;
				done();
			});
    });

    it('Should not update a Vehicle', async (done) => {
		await helper.resetDatabase();
        await helper.loadFixtures();
        
        let vehicle = new Vehicle();
        try{
            vehicle = await helper.getRepo(Vehicle).findOneOrFail({vehicleId:1});
        }catch(error){
            console.log(`The Vehicle with VehicleId: ${vehicle.vehicleId}, could not be found`)
        }

		request(helper.app)
            .patch(`/api/Vehicle/${vehicle.vehicleId}`)
            .send({
				vehicleType: 40,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(400)
			.end(async (err) => {
				if (err) throw err;
				done();
			});
    });
});