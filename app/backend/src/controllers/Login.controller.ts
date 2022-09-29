import { Request, Response } from 'express';
import generateToken from '../auth/generateToken';

class Login {
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      const token = generateToken(email);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default Login;
