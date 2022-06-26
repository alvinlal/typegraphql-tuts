import jwt from 'jsonwebtoken';
import User from '../../entity/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import JwtPayload from 'src/types/JwtPayload';

@Resolver()
export default class ConfirmUser {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      await User.update({ id: +userId }, { confirmed: true });
      return true;
    } catch (err) {
      return false;
    }
  }
}
