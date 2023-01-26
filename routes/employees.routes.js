const express = require('express');
const router = express.Router();
const EmployeesControllers = require('./../controllers/employees.contoler');

router.get('/employees', EmployeesControllers.getAll);

router.get('/employees/random', EmployeesControllers.getRandom);

router.get('/employees/:id', EmployeesControllers.getEmpById);

router.post('/employees', EmployeesControllers.postEmp);

router.put('/employees/:id',EmployeesControllers.editEmp);

router.delete('/employees/:id', EmployeesControllers.deleteEmp);

module.exports = router;


