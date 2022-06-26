import User from '../../entity/User';
import { Arg, Ctx, Mutation } from 'type-graphql';
import Context from '../../types/Context';
import bcrypt from 'bcryptjs';

export default class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    ctx.req.session.userId = user.id;

    return user;
  }
}
