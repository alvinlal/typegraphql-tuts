import User from '../../entity/User';
import createForgotPasswordUrl from '../../utils/createForgotPasswordUrl';
import sendMail from '../../utils/sendMail';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export default class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string) {
    const user = await User.findOneBy({ email });

    if (!user) {
      return false;
    }

    await sendMail(email, createForgotPasswordUrl(user.id));

    return true;
  }
}
