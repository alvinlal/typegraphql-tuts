import Context from '../../types/Context';
import { Ctx, Query, Resolver } from 'type-graphql';
import User from '../../entity/User';

@Resolver()
export default class meResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    if (!ctx.req.session.userId) {
      return null;
    }
    return User.findOne({
      where: {
        id: ctx.req.session.userId,
      },
    });
  }
}
