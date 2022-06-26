import jwt from 'jsonwebtoken';

const createForgotPasswordUrl = (userId: number) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1h',
    }
  );

  return `http://${process.env.ORIGIN}/user/change-password/${token}`;
};

export default createForgotPasswordUrl;
