import Context from '../../types/Context';
import { Ctx, Mutation, Resolver } from 'type-graphql';

@Resolver()
export default class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session.destroy(err => {
        if (err) {
          console.error(err);
          return reject(false);
        }

        ctx.res.clearCookie('qid');
        return resolve(true);
      });
    });
  }
}
