import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota GET /leaderboard', () => {
  let chaiHttpResponse: Response;

  it('se requisitado retorna as informações no padrão correto', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard')

    chai.expect(chaiHttpResponse.status).to.be.equal(200);
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('name');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalPoints');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalGames');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalVictories');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalDraws');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalLosses');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsFavor');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsOwn');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsBalance');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('efficiency');
  });
});

describe('Testa rota GET /leaderboard/home', () => {
 let chaiHttpResponse: Response;

 it('se requisitado retorna as informações no padrão correto', async () => {
   chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home')

   chai.expect(chaiHttpResponse.status).to.be.equal(200);
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('name');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalPoints');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalGames');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalVictories');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalDraws');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalLosses');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsFavor');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsOwn');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsBalance');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('efficiency');
 });
});

describe('Testa rota GET /leaderboard/away', () => {
 let chaiHttpResponse: Response;

 it('se requisitado retorna as informações no padrão correto', async () => {
   chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away')

   chai.expect(chaiHttpResponse.status).to.be.equal(200);
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('name');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalPoints');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalGames');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalVictories');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalDraws');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('totalLosses');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsFavor');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsOwn');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('goalsBalance');
   chai.expect(chaiHttpResponse.body).to.haveOwnProperty('efficiency');
 });
});

