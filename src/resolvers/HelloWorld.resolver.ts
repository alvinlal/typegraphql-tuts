import isAuthenticated from '../middlewares/isAuthenticated';
import { Resolver, Query, UseMiddleware } from 'type-graphql';

@Resolver()
class HelloWorldResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => String, { nullable: true })
  async hello() {
    return 'Hello world';
  }
}

export default HelloWorldResolver;
