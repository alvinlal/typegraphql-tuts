import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../../entity/User';
import { IsEmail, Length } from 'class-validator';
import { IsEmailAlreadyExist } from '../../validators/isEmailAlreadyExists';
import sendEmail from '../../utils/sendMail';
import createConfirmationUrl from '../../utils/createConfirmationUrl';

@InputType()
class RegisterInput {
  @Field()
  @Length(1, 255)
  firstname: string;

  @Field()
  @Length(1, 255)
  lastname: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'email already exists' })
  email: string;

  @Field()
  password: string;
}

@Resolver()
export default class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg('registerInput') { firstname, lastname, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    }).save();

    const info = await sendEmail(email, createConfirmationUrl(user.id));
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return user;
  }
}
