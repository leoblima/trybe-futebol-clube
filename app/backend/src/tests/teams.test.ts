import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/User';

import teamsMock from '../tests/mocks/teamsMock';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

interface Team {
  id: number,
  teamName: string,
}

describe('Testa rota GET /teams', () => {
  let chaiHttpResponse: Response;

  it('se quando requisitado retorna todos os times como o esperado', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

    chai.expect(chaiHttpResponse.status).to.be.equal(200);
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('teamName');
    chai.expect(chaiHttpResponse.body[0]).to.haveOwnProperty('id');
    chai.expect(chaiHttpResponse.body[0].id).to.equal(1);
    chai.expect(chaiHttpResponse.body[0].teamName).to.be.equal('Avaí/Kindermann')
    chaiHttpResponse.body.forEach((team: Team, index: number) => {
      chai.expect(team.id).to.equal(teamsMock[index].id);
      chai.expect(team.teamName).to.equal(teamsMock[index].teamName);
    });
  });
});

describe('Testa rota GET /teams/:id', () => {
  let chaiHttpResponse: Response;

  it('se quando requisitado com o id = 1 retorna o time correto', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');

    chai.expect(chaiHttpResponse.status).to.be.equal(200);
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('teamName');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('id');
    chai.expect(chaiHttpResponse.body.id).to.equal(1);
    chai.expect(chaiHttpResponse.body.teamName).to.be.equal('Avaí/Kindermann')
  });

  it('se quando requisitado com o id = 8 retorna o time correto', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/teams/8');

    chai.expect(chaiHttpResponse.status).to.be.equal(200);
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('teamName');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('id');
    chai.expect(chaiHttpResponse.body.id).to.equal(8);
    chai.expect(chaiHttpResponse.body.teamName).to.be.equal('Grêmio')
  });
});
