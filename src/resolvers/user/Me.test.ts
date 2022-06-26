import gCall from '../../test-utils/gCall';
import { faker } from '@faker-js/faker';
import testConn from '../../test-utils/testConn';
import { DataSource } from 'typeorm';
import User from '../../entity/User';

let conn: DataSource;

beforeAll(async () => {
  conn = await testConn().initialize();
});

afterAll(async () => {
  await conn.destroy();
});

const meQuery = `
query Me {
    me {
      id
      firstname
      lastname
      name
      email
      confirmed
    }
  } 
`;

describe('Me', () => {
  it('get user', async () => {
    const user = await User.create({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          firstname: user.firstname,
          lastname: user.lastname,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
        },
      },
    });
  });
  it('returns null if not authenticated', async () => {
    const response = await gCall({
      source: meQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
