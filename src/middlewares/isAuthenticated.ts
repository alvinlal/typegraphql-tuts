import Context from '../types/Context';
import { MiddlewareFn } from 'type-graphql';

const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Not authenticated!');
  }
  return next();
};

export default isAuthenticated;
