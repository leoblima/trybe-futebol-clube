import * as express from 'express';
import Login from './controllers/Login.controller';
// import UserController from './controllers/User.controller';
import LoginValidation from './middlewares/Login.middleware';
import validate from './middlewares/LoginValidate.middleware';
import TeamsController from './controllers/Team.controller';
import MatchControll from './controllers/Match.controller';
import MatchValidation from './middlewares/Match.middleware';
import LeaderboardController from './controllers/Leaderboard.controller';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post('/login', LoginValidation.checkLogin, Login.login);

    this.app.get('/login/validate', validate.checkJWT, Login.loginValidate);

    this.app.get('/teams', TeamsController.findAll);

    this.app.get('/teams/:id', TeamsController.findByPk);

    this.app.get('/matches', MatchControll.findAll);

    this.app.post('/matches', validate.checkJWT, MatchValidation.checkMatch, MatchControll.create);
    this.app.patch('/matches/:id/finish', MatchControll.finishMatch);

    this.app.patch('/matches/:id', MatchValidation.checkMatchProgress, MatchControll.updateMatch);

    this.app.get('/leaderboard/home', LeaderboardController.getLeadaerboardHome);

    this.app.get('/leaderboard/away', LeaderboardController.getLeadaerboardAway);

    this.app.get('/leaderboard', LeaderboardController.getLeaderboard);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
