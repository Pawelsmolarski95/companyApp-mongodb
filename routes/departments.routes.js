const express = require('express');
const DepartmentControllers = require('../controllers/departments.controller');
const router = express.Router();


router.get('/departments',  DepartmentControllers.getAll);

router.get('/departments/random', DepartmentControllers.getRandom);

router.get('/departments/:id', DepartmentControllers.getDepById);

router.post('/departments', DepartmentControllers.postDep);

router.put('/departments/:id', DepartmentControllers.editDep);

router.delete('/departments/:id', DepartmentControllers.deleteDep);

module.exports = router;
