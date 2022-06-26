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

const registerMutation = `
mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      name,
      firstname,
      lastname,
      email,
    }
  }  
`;

describe('Register', () => {
  it('create user', async () => {
    const user = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        registerInput: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          name: `${user.firstname} ${user.lastname}`,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      },
    });

    const dbUser = await User.findOneBy({ email: user.email });
    expect(dbUser).toBeDefined();
    expect(dbUser?.confirmed).toBeFalsy();
    expect(dbUser!.firstname).toBe(user.firstname);
  });
});
