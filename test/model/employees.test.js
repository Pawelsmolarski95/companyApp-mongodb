const Employees = require('../../models/employees.model');
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employees", () => {
   it('should throw an error if no "firstName, lastName"', () => {
    const emp = new Employees({});
  
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      
    });
  
  });
  it('should throw an error if  "firstName" is not a string', () => {
    
    const cases = [{},[]];
    for(let firstName of cases) {
        const emp = new Employees({ firstName });
    
        emp.validate(err => {
        expect(err.errors.firstName).to.exist;
        });
    }
  });
  it('should throw an error if  "lastName" is not a string', () => {
    
    const cases = [{},[]];
    for(let lastName of cases) {
        const emp = new Employees({ lastName });
    
        emp.validate(err => {
        expect(err.errors.lastName).to.exist;
        });
    }
  });
  it('should throw an error if no "department" ', () => {
    const emp = new Employees({});
  
    emp.validate(err => {
      expect(err.errors.department).to.exist;
    
    });
  
  });
});
  
after(() => {
    mongoose.models = {};
  });
  