const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments/:id', () => {
    before(async () => {

        const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
        await testDepTwo.save();
      });
    it('/id should remove one department by id ', async () => {
        const res = await request(server).delete('/api/departments/d9f1159f81ce8d1ef2bee48');
        expect(res.status).to.be.equal(200);
        expect(res.body).not.to.be.null;
    });
})