import jwt from 'jsonwebtoken';

const createConfirmationUrl = (userId: number) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1 days',
    }
  );

  return `http://${process.env.ORIGIN}/user/confirm/${token}`;
};

export default createConfirmationUrl;
