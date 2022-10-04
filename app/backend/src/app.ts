import * as express from 'express';
import Login from './controllers/Login.controller';
// import UserController from './controllers/User.controller';
import LoginValidation from './middlewares/Login.middleware';
import LoginValidate from './middlewares/LoginValidate.middleware';
import TeamsController from './controllers/Team.controller';
import MatchController from './controllers/Match.controller';
import MatchValidation from './middlewares/Match.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post('/login', LoginValidation.checkLogin, Login.login);

    this.app.get('/login/validate', LoginValidate.verifyJWTMiddleware, Login.loginValidate);

    this.app.get('/teams', TeamsController.findAll);

    this.app.get('/teams/:id', TeamsController.findByPk);

    this.app.get('/matches', MatchController.findAll);

    this.app.post(
      '/matches',
      LoginValidate.verifyJWTMiddleware,
      MatchValidation.checkMatch,
      MatchController.create,
    );

    this.app.patch('/matches/:id/finish', MatchController.finishMatch);

    this.app.patch('/matches/:id', MatchValidation.checkMatchProgress, MatchController.updateMatch);
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
