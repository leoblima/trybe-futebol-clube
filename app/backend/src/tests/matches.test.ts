import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import matchesMock from './mocks/matchMocks';


import { Response } from 'superagent';
import MatchModel from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY2NDkyODA0NSwiZXhwIjoxNjY1NTMyODQ1fQ.rYLpRm135LSclOxs0WKrVL1N2077-_dWJCffItMPGl8`;

interface ITeamMatch {
  teamName: string
}

interface IMatch {
 id: number,
 homeTeam: number,
 homeTeamGoals: number,
 awayTeam: number,
 awayTeamsGoals: number,
 inProgress: boolean,
 teamHome: ITeamMatch,
 teamAway: ITeamMatch,
}

describe('Testa rota GET /matches', () => {
  let chaiHttpResponse: Response;

  it('se quando requisitado retorna todas as partidas como o esperado', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/matches');

    chai.expect(chaiHttpResponse.status).to.be.equal(200);

    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('id');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeam');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeamGoals');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeam');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeamGoals');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('inProgress');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('teamHome');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('teamAway');

    chai.expect(chaiHttpResponse.body[0].id).to.equal(1);
    chai.expect(chaiHttpResponse.body[0].homeTeam).to.equal(16);
    chai.expect(chaiHttpResponse.body[0].homeTeamGoals).to.equal(1);
    chai.expect(chaiHttpResponse.body[0].awayTeam).to.equal(8);
    chai.expect(chaiHttpResponse.body[0].awayTeamGoals).to.equal(1);
    chai.expect(chaiHttpResponse.body[0].inProgress).to.equal(false);
    chai.expect(chaiHttpResponse.body[0].teamHome.teamName).to.equal('São Paulo');
    chai.expect(chaiHttpResponse.body[0].teamAway.teamName).to.equal('Grêmio');
  });
});

describe('Testa rota GET /matches?inProgress', () => {
  let chaiHttpResponse: Response;

  it('se quando inProgress é verdadeiro retorna todas as partidas em progresso como o esperado', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');

    chai.expect(chaiHttpResponse.status).to.be.equal(200);
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('id');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeam');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeamGoals');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeam');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeamGoals');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('inProgress');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('teamHome');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('teamAway');

    chaiHttpResponse.body.forEach((match: IMatch) => {
      chai.expect(match.inProgress).to.equal(true);
    })
  });
  it('se quando inProgress é falso retorna todas as partidas terminadas como o esperado', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');

    chai.expect(chaiHttpResponse.status).to.be.equal(200);

    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('id');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeam');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeamGoals');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeam');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeamGoals');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('inProgress');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('teamHome');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('teamAway');

    chaiHttpResponse.body.forEach((match: IMatch) => {
      chai.expect(match.inProgress).to.equal(false);
    })
  });
});
describe('Testa rota POST /matches', () => {
  let chaiHttpResponse: Response;

  it('se quando enviada salva a partida como esperado', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeam: 16,
          awayTeam: 8, 
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        })

    chai.expect(chaiHttpResponse.status).to.be.equal(201);

    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('id');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeam');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('homeTeamGoals');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeam');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('awayTeamGoals');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('inProgress');

    chai.expect(chaiHttpResponse.body[0].homeTeam).to.equal(16);
    chai.expect(chaiHttpResponse.body[0].homeTeamGoals).to.equal(2);
    chai.expect(chaiHttpResponse.body[0].awayTeam).to.equal(8);
    chai.expect(chaiHttpResponse.body[0].awayTeamGoals).to.equal(2);
    chai.expect(chaiHttpResponse.body[0].inProgress).to.equal(true);
  });
  it('se não é possível incluir uma partida com dois times iguais', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeam: 16,
          awayTeam: 16, 
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        })

    chai.expect(chaiHttpResponse.status).to.be.equal(401);

    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    chai.expect(chaiHttpResponse.body.message).to.equal('It is not possible to create a match with two equal teams');
  });
  it('se não é possível incluir uma partida com um time inexistente', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeam: 9999,
          awayTeam: 16, 
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        })

    chai.expect(chaiHttpResponse.status).to.be.equal(401);

    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    chai.expect(chaiHttpResponse.body.message).to.equal('There is no team with such id!');
  });
  it('se não é possível incluir uma partida com token inválido', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .auth('', { type: 'bearer' })
        .send({
          homeTeam: 8,
          awayTeam: 16, 
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        })

    chai.expect(chaiHttpResponse.status).to.be.equal(401);

    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    chai.expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
  });
});

describe('Testa rota PATCH /matches/:id/finish', () => {
  let chaiHttpResponse: Response;

  it('se quando enviada finaliza a partida como o esperado', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/41/finish')

    chai.expect(chaiHttpResponse.status).to.be.equal(200);

    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    chai.expect(chaiHttpResponse.body.message).to.equal('Finished');

    const data = await MatchModel.findByPk(41);
    chai.expect(data).to.not.equal('');
    chai.expect(data?.inProgress).to.equal(false);
  });
});

describe('Testa rota PATCH /matches/:id', () => {
  let chaiHttpResponse: Response;

  it('se atualiza a partida como o esperado', async () => {
    const before = await MatchModel.findByPk(41);
    chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/42')
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        })

    chai.expect(chaiHttpResponse.status).to.be.equal(200);
    const data = await MatchModel.findByPk(42);

    chai.expect(data).to.not.equal('');
    chai.expect(data?.homeTeamGoals).to.equal(3);
    chai.expect(data?.awayTeamGoals).to.equal(1);

    chai.expect(data).to.not.equal(before);
  });
});
