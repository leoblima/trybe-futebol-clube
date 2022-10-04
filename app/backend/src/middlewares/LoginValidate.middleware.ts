import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import UserService from '../service/User.service';
import verifyJWT from '../auth/validateJWT';

const secret = process.env.JWT_SECRET || 'uitaPulchraEst';

class LoginValidate {
  static async getUserByToken(token: string) {
    const decoded: JwtPayload | string = verify(token, secret);
    if (typeof decoded !== 'string') {
      const user = UserService.findOneByEmail(decoded.data.email);
      if (user) return user;
    }
  }

  static async verifyJWTMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');

      if (token && typeof token === 'string') {
        const user = await LoginValidate.getUserByToken(token);
        if (user && verifyJWT(token, user.email)) {
          req.body.role = user.role;
          next();
        }
      }
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token!' });
    }
  }
}

export default LoginValidate;
