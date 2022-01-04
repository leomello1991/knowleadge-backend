import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_license)
      VALUES( '${id}', 'leonardo', 'admin@rentax.com.br', '${password}', true, 'now()', 'XXXXXX')`,
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('Should be able create a new category ', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentax.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'category supertest',
        description: 'description category supertest',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(201);
  });

  it('Should not be able create a new category with name exists ', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentax.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'category supertest',
        description: 'description category supertest',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(400);
  });
});
