import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import JwtPayload from '../../types/JwtPayload';
import { Arg, Mutation, Resolver } from 'type-graphql';
import User from '../../entity/User';

@Resolver()
export default class ChangePassword {
  @Mutation(() => Boolean)
  async changePassword(@Arg('token') token: string, @Arg('password') password: string) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await User.findOneBy({ id: userId });

      if (!user) {
        return false;
      }

      user.password = await bcrypt.hash(password, 12);

      await user.save();

      return true;
    } catch (err) {
      return false;
    }
  }
}
