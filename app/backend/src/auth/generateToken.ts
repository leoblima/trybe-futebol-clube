import { sign, SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'uitaPulchraEst';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function generateToken(email: string): string {
  const token = sign({ data: { email } }, secret, jwtConfig);
  return token;
}

export default generateToken;
