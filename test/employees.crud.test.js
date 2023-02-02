const Employee = require("../models/employees.model");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employees", () => {
    before(async () => {
        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        } catch (err) {
          console.error(err);
        }
      });
      
      describe("Reading data", () => {
        before(async () => {
            const testEmpOne = new Employee({ firstName: "FirstName #1", lastName: "LastName #1", department: "Department #1" });
            await testEmpOne.save();
      
            const testEmpTwo =new Employee({ firstName: "FirstName #2", lastName: "LastName #2", department: "Department #2" });
            await testEmpTwo.save();
          });
        it('should return all the data with find method', async () => {
            const employees =  await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);    
        });
        it('should return proper document by various params with findOne method', async () => {
            const employees =  await Employee.findOne({ firstName: "FirstName #2", lastName: "LastName #2", department: "Department #2" });
            const expectedEmployeeFirstName = "FirstName #2";
            const expectedEmployeeLastName = "LastName #2";
            const expectedEmployeeDepartment = "Department #2";
            expect(employees.firstName).to.be.equal(expectedEmployeeFirstName);    
            expect(employees.lastName).to.be.equal(expectedEmployeeLastName);    
            expect(employees.department).to.be.equal(expectedEmployeeDepartment);    
        });
        after(async () => {
            await Employee.deleteMany();
        });
      });
      
      describe('Creating data', () => {
        it("should insert new document with insertOne method", async () => {
            const employees = new Employee({ firstName: "FirstName #2", lastName: "LastName #2", department: "Department #2" });
            await employees.save();
            expect(employees.isNew).to.be.false;
            after(async () => {
            
        });
        await Employee.deleteMany();
        });
      });
      
      describe('Updating data',  () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
            await testEmpOne.save();
      
            const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Black', department: 'Marketing' });
            await testEmpTwo.save();
          });
          
        it("should properly update one document with updateOne method", async () => {
            await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: 'Peter' }
            });
            const updatedEmployee = await Employee.findOne({ firstName: 'Peter' })
            expect(updatedEmployee).to.not.be.null;    
        });
        
        it("should properly update one document with save method", async () => {
            const employee = await Employee.findOne({ firstName: 'Amanda' });
            employee.firstName = 'Ann';
            await employee.save();
            const updatedEmployee =  await Employee.findOne({ firstName: 'Ann'});
            expect(updatedEmployee).to.not.be.null;
            
        });
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { lastName: 'Updated!' }});
            const employees = await Employee.find({ lastName: 'Updated!' });
            expect(employees.length).to.be.equal(2)
          });
        
        afterEach(async () => {
            await Employee.deleteMany();
          });
      });
      describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
            await testEmpOne.save();
      
            const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Black', department: 'Marketing' });
            await testEmpTwo.save();
          });
        it('should properly remove one document with deleteOne method', async () => {
            await Employee.deleteOne({ firstName: 'John' });
            const removedEmp =  await Employee.findOne({ firstName: 'John' });
            expect(removedEmp).to.be.null;
        });
        it('should properly remove one document with remove method', async () => {
            const employee = await Employee.findOne({ firstName: 'Amanda' });
            employee.remove();
            const removedEmployee =  await Employee.findOne({ firstName: 'Amanda' });
            expect(removedEmployee).to.be.null;
        });
        it('should properly remove multiple documents with deleteMany method', async () => {
            await Employee.deleteMany();
            const deletedEmployee = await Employee.find();
            expect(deletedEmployee.length).to.be.equal(0);
        });
        afterEach(async () => {
            await Employee.deleteMany();
          });
      });
});