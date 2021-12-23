const request = require('supertest');
const { validate } = require('uuid');
const { v4: uuidv4 } = require('uuid');


const app = require('../');

describe('Users', () => {
  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        username: 'johndoe'
      })
    expect(201);

    expect(validate(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      name: 'John Doe',
      username: 'johndoe',
    });
  });

  it('should not be able to create a new user when username already exists', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        username: 'johndoe'
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        username: 'johndoe'
      })
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });

  it("should be able to list all users", async () => {
    const userResponse = await request(app)
      .post('/users')
      .send({
        name: 'Pedro Henrique',
        username: 'pedro'
      });


    const response = await request(app)
      .get('/users')

    expect(response.body).toEqual(
      expect.arrayContaining([
        userResponse.body
      ]),
    )
  });

  it('should be able to update a user', async () => {
    const userResponse = await request(app)
      .post('/users')
      .send({
        name: 'Marcos Pereira',
        username: 'marcos'
      });


    const response = await request(app)
      .put(`/users/${userResponse.body.id}`)
      .send({
        name: 'Marcos Silva',
        username: 'marcos'
      })

    expect(response.body).toMatchObject({
      name: 'Marcos Silva',
      username: 'marcos',
    });

  });

  it('should be able to update a user', async () => {
    const userResponse = await request(app)
      .post('/users')
      .send({
        name: 'Fernando Teixeira',
        username: 'fernando'
      });


    const response = await request(app)
      .put(`/users/${userResponse.body.id}`)
      .send({
        name: 'Fernando Ravin',
        username: 'fernando'
      })

    expect(response.body).toMatchObject({
      name: 'Fernando Ravin',
      username: 'fernando'
    });

  });

  it('should not be able to update a non existing user', async () => {

    const response = await request(app)
      .put(`/users/${uuidv4()}`)
      .send({
        name: 'Fernando Teixeira',
        username: 'fernando'
      }).expect(404);

    expect(response.body.error).toBeTruthy();
  });

  it('should be able to delete a user', async () => {
    const userResponse = await request(app)
      .post('/users')
      .send({
        name: 'Renan Souza',
        username: 'renan'
      });


    await request(app)
      .delete(`/users/${userResponse.body.id}`)
      .expect(201);

  });


  it('should not be able to delete a non existing todo', async () => {
    const response = await request(app)
      .delete(`/users/${uuidv4()}`)
      .expect(404);

    expect(response.body.error).toBeTruthy();
  });
});