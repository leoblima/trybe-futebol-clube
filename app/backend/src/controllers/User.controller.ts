import { Request, Response } from 'express';
import UserService from '../service/User.service';

// const userService = new UserService();

class UserController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const { code, data } = await UserService.create(email, password);
      return res.status(code).json({ token: data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default UserController;
