import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import matchesMock from './mocks/matchMocks';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

interface TeamMatch {
  teamName: string
}

interface Match {
 id: number,
 homeTeam: number,
 homeTeamGoals: number,
 awayTeam: number,
 awayTeamsGoals: number,
 inProgress: boolean,
 teamHome: TeamMatch,
 teamAway: TeamMatch,
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