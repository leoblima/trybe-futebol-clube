import { JwtPayload, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'uitaPulchraEst';

function verifyJWT(token: string, email: string): boolean {
  const decoded: JwtPayload | string = verify(token, secret);

  if (typeof decoded !== 'string') {
    return decoded.data.email === email;
  }
  return false;
}

export default verifyJWT;
