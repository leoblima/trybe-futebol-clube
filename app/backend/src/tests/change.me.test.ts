import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User';

import mockFindAllUser from './mocks/userModelFindAll';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Models e Migrations para Users tab', () => {
  let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(UserModel, "findAll")
        .resolves([
          ...mockFindAllUser
        ]);
    }) 
    after(()=>{
      (Example.findOne as sinon.SinonStub).restore();
    } 
    it('...', async () => {
      chaiHttpResponse = await chai
          .request(app)
          .. 
      expect(...)
    });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
