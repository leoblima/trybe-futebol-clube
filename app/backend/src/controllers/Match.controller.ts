import { Request, Response } from 'express';
import MatchService from '../service/Match.service';

class MatchController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const progress = req.query.inProgress;
      if (progress !== null && typeof progress === 'string') {
        const { code, data } = await MatchService.findAllInProgress(progress);
        return res.status(code).json(data);
      }
      const { code, data } = await MatchService.findAll();
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const newMatch = req.body;
      const { code, data } = await MatchService.create(newMatch);
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async finishMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { code, message } = await MatchService.finishMatch(Number(id));
      return res.status(code).json({ message });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default MatchController;
