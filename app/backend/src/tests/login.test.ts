import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User';

import tokenMock from './mocks/tokenMock';
import verifyJWT from '../auth/validateJWT';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota POST /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "create")
      .resolves();
  });

  after(()=>{
    (UserModel.create as sinon.SinonStub).restore();
  })

  it('se quando postado com o corpo correto um token é retornado', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "secret_admin"
      })

    chai.expect(chaiHttpResponse.status).to.be.equal(200);
    chai.expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('se o token é retornado', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin"
  })
    const token = chaiHttpResponse.body.token;
    chai.expect(token.length).to.equal(tokenMock.token.length);
    chai.expect(verifyJWT(token, 'admin@admin.com')).to.equal(true);
  });

  it('se com o email não está preenchido, é retornada a mensagem: "All fields must be filled"', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "",
      "password": "secret_admin"
  })
    chai.expect(chaiHttpResponse.status).to.equal(400);
    chai.expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('se com o password não está preeenchido, é retornada a mensagem: "All fields must be filled"', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "admin@admin.com",
      "password": ""
  })
    chai.expect(chaiHttpResponse.status).to.equal(400);
    chai.expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('se com o email não está preenchido, é retornada a mensagem: "Incorrect email or password"', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "not_valid",
      "password": "secret_admin"
  })
    chai.expect(chaiHttpResponse.status).to.equal(401);
    chai.expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('se com o password inválido, é retornada a mensagem: "Incorrect email or password"', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "not_valid"
  })
    chai.expect(chaiHttpResponse.status).to.equal(401);
    chai.expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });
});
