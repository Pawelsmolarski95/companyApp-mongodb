const Employee = require('./../models/employees.model');

exports.getAll = async (req, res) => {
  
    try {
      res.json(await Employee.find().populate('department'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
  
    try {
      const count = await Employee.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const emp = await Employee.findOne().skip(rand);
      if(!emp) res.status(404).json({ message: 'Not found' });
      else res.json(emp)
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getEmpById = async (req, res) => {
 
    try {
      const emp = await Employee.findById(req.params.id);
      if(!emp) res.status(404).json({ message: 'Not found' });
      else res.json(emp)
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.postEmp = async (req, res) => {
  
    try {
      const { firstName, lastName } = req.body;
      const NewEmployee = new Employee({ firstName: firstName, lastName: lastName });
      await NewEmployee.save(); 
      res.json({ message: 'OK' });
    } 
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.editEmp = async (req, res) => {
  
    try {
      const { firstName, lastName } = req.body;
      const emp = await Employee.findById(req.params.id);
      if(emp) {
        await Employee.updateOne({_id: req.params.id}, {$set: { firstName: firstName , lastName: lastName }})
        res.json({ message: 'OK' });
      } else {
          res.status(404).json({ message: 'Not found' })
      }
    }
    catch(err) {
      res.status(500).json({message: err});
    } 
};

exports.deleteEmp = async (req, res) => {
  
    try {
      const emp = await Employee.findById(req.params.id);
      if(emp) {
        await Employee.deleteOne(req.params.id);
        res.json({ message: 'OK' });
      } else {
          res.status(404).json({ message: 'Not found' })
      }
    }
    catch(err) {
      res.status(500).json({message: err});
    }
};