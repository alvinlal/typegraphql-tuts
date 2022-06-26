import { buildSchema } from 'type-graphql';

const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + '/../resolvers/**/*.resolver.ts'],
  });

export default createSchema;
