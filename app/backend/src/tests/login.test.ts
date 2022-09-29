import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User';

import tokenMock from './mocks/tokenMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa conexão do Backend com o Database', () => {
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
          "email": "annita@gmail.com",
          "password": "anusTatuado"
      })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.json).to.haveOwnProperty('token');
  });

  // it('se o token é retornado', () => {
  //   expect(false).to.be.eq(true);
  // });
});
