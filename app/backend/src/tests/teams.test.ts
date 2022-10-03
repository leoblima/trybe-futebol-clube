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

describe('Testa rota GET /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves();
  });

  after(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('se quando requisitado retorna os valores corretos', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

    chai.expect(chaiHttpResponse.status).to.be.equal(200);
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('teamName');
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('id');
    chai.expect(chaiHttpResponse.body).to.be.equal(teamsMock);


  });

  it('se o token é retornado', async () => {
  });

  it('se com o email não está preenchido, é retornada a mensagem: "All fields must be filled"', async () => {
  });

  it('se com o password não está preeenchido, é retornada a mensagem: "All fields must be filled"', async () => {
  });

  it('se com o email não está preenchido, é retornada a mensagem: "Incorrect email or password"', async () => {
  });

  it('se com o password inválido, é retornada a mensagem: "Incorrect email or password"', async () => {
  });
});

