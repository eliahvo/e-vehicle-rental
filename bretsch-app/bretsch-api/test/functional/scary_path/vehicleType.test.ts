import { Helper } from "../../helper";
import request from "supertest";

const helper = new Helper();
helper.init();

describe("Tests for the VehicleType class Scary Path", () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  //Not all necessary parameters are sent in the body
  it("createVehicleType Test Scary Path", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post("/api/vehicletype")
      .send({
        pricePerMinute: 7,
        minimalBatteryLevel: 17,
        vehicles: [],
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("Error: Parameter missing!");
        done();
      });
  });

  //A nonexistent vehicletype id is used
  it("deleteVehicleType Test Scary Path", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    const vehicleTypeId = 55;

    request(helper.app)
      .delete(`/api/vehicletype/${vehicleTypeId}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("Error: " + err);
        done();
      });
  });

  //A nonexistent vehicletype id is used
  it("getSpecificVehicleType Test Scary Path", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    const vehicleTypeId = 55;

    request(helper.app)
      .get(`/api/user/${vehicleTypeId}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("Error: " + err);
        done();
      });
  });

  //A nonexistent user id is used
  it("getAllVehiclesByVehicleTypeId Test Scary Path", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    const vehicleTypeId = 55;

    request(helper.app)
      .get(`/api/vehicletype/${vehicleTypeId}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("Error: " + err);
        done();
      });
  });
  //A nonexistent user id is used
  it("updateVehicleType Test Scary Path", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    const vehicleTypeId = 55;

    request(helper.app)
      .patch(`/api/vehicletype/${vehicleTypeId}`)
      .send({
        firstName: "user1 Update",
        birthDate: "10.10.1010",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("Error: " + err);
        done();
      });
  });
});
