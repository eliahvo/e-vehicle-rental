import request from 'supertest';
import { User } from '../../../src/entity/User.entity';
import { Helper } from '../../helper';

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

  // Not all necessary parameters are sent in the body
  it('createUser Test Scary Path', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    request(helper.app)
      .post('/api/user')
      .send({
        email: 'userTest@bretsch.eu',
        hashedPassword: 'bretschTest',
        userRole: 'admin',
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

  // A nonexistent user id is used
  it('deleteUser Test Scary Path', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const userId = 55;

    request(helper.app)
      .delete(`/api/user/${userId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, user] = await helper.getRepo(User).findAndCount();
        expect(user).toBe(3);
        done();
      });
  });

  // A nonexistent user id is used
  it('getBookingsByUserId Test Scary Path', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const userId = 55;

    request(helper.app)
      .get(`/api/user/${userId}/bookings`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, user] = await helper.getRepo(User).findAndCount();
        expect(user).toBe(3);
        done();
      });
  });

  // A nonexistent user id is used
  it('getSpecificUser Test Scary Path', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const userId = 55;

    request(helper.app)
      .get(`/api/user/${userId}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        const [, user] = await helper.getRepo(User).findAndCount();
        expect(user).toBe(3);
        done();
      });
  });
  // A nonexistent user id is used
  it('updateUser Test Scary Path', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const authToken = await helper.loginUser('user1@bretsch.eu');
    const userId = 55;

    request(helper.app)
      .patch(`/api/user/${userId}`)
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
        const [, user] = await helper.getRepo(User).findAndCount();
        expect(user).toBe(3);
        done();
      });
  });
});
