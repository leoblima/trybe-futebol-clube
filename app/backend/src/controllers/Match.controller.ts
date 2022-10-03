import { Request, Response } from 'express';
import MatchService from '../service/Match.service';

class MatchController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const { code, data } = await MatchService.findAllDirect();
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default MatchController;
