import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import createSchema from './utils/createSchema';
import cors from 'cors';
import db from './config/db';
import redis from './config/redis';

const main = async () => {
  // schema
  const schema = await createSchema();

  // db connection
  await db.initialize();

  // redis connection
  await redis.connect();

  // apolloServer
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  // express server
  const app = Express();

  // connect-redis
  const RedisStore = connectRedis(session);

  // middlewares
  app.set('trust proxy', process.env.NODE_ENV !== 'production');
  app.use(
    cors({
      origin: [process.env.ORIGIN!, 'https://studio.apollographql.com'],
      credentials: true,
    })
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 2160000000,
        sameSite: process.env.NODE_ENV == 'development' ? 'none' : 'lax',
      },
    })
  );

  // apply middleware
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: 'https://studio.apollographql.com',
      credentials: true,
    },
  });

  // listen
  app.listen(4000, () => console.log(`server listening on http://localhost:4000/graphql 🚀`));
};

main().catch(err => console.error(err));
