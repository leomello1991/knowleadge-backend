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
  it('Should be able list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentax.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;
    await request(app)
      .post('/categories')
      .send({
        name: 'category supertest',
        description: 'description category supertest',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    await request(app)
      .post('/categories')
      .send({
        name: 'category supertest2',
        description: 'description category supertest2',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[1].name).toEqual('category supertest2');
  });
});
