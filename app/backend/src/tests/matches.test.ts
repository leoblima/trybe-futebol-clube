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
    // chaiHttpResponse.body.forEach((match: Match, index: number) => {
    //   chai.expect(match.homeTeam).to.equal(matchesMock[index].home_team);
    //   chai.expect(match.awayTeam).to.equal(matchesMock[index].away_team);
    //   chai.expect(match.homeTeamGoals).to.equal(matchesMock[index].home_team_goals);
    //   chai.expect(match.awayTeamsGoals).to.equal(matchesMock[index].away_team_goals);
    //   chai.expect(match.inProgress).to.equal(matchesMock[index].in_progress);
    // });
  });
});