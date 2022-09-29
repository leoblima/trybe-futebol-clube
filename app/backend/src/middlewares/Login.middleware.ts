import { Request, Response, NextFunction } from 'express';
import UserService from '../service/User.service';
import { comparePassword } from '../auth/hash';

class LoginValidation {
  static async getUserByEmail(email:string) {
    const user = await UserService.findOneByEmail(email);
    return user;
  }

  static async isEmailValid(email: string): Promise<boolean> {
    const user = LoginValidation.getUserByEmail(email);
    if (user === null) {
      return false;
    }

    return true;
  }

  static async isPasswordValid(email: string, password: string): Promise<boolean> {
    const user = await LoginValidation.getUserByEmail(email);
    if (user) {
      const isValid = comparePassword(password, user.password);
      return isValid;
    }
    return false;
  }

  static async checkLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const validEmail = await LoginValidation.isEmailValid(email);
      const validPassword = await LoginValidation.isPasswordValid(email, password);
      if (!validEmail || !validPassword) {
        return res.status(403).json({ message: 'Email or password invalid!' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default LoginValidation;
