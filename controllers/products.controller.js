const Product = require('./../models/products.model');

exports.getAll = async (req, res) => {
  
    try {
      res.json(await Product.find());
    }
    catch(err) {
      res.status(500).json({message: err});
    }
};

exports.getRandom = async (req, res) => {
  
    try {
      const count = await Product.countDocuments();
      const rand =  Math.floor(Math.random() * count);
      const pro = await Product.findOne().skip(rand);
      if(!pro) res.status(404).json({ message: 'Not found' })
      else res.json(pro)
    }
    catch(err) {
      res.status(500).json({message: err});
    }
};

exports.getProById = async (req, res) => {
  
    try {
      const pro = await Product.findById(req.params.id);
      if(!pro) res.status(404).json({ message: 'Not found' });
      else res.json(pro);
    }
    catch(err) {
      res.status(500).json({message: err});
    }
};

exports.postPro = async (req, res) => {
  
    try {
      const { name, client } = req.body;
      const newProduct =  newProduct({ name: name, client: client });
      newProduct.save();
      res.json({ message: 'OK' });
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.editPro = async (req, res) => {
  
    try {
      const { name, client } = req.body;
      const pro = await Product.findById(req.params.id);
      if(pro) {
        await Product.updateOne({_id: req.params.id}, {$set: { name: name, client: client } });
        res.json(pro);
      } else {
          res.status(404).json({ message: 'Not found' });
      }  
    }
    catch(err) {
      res.status(500).json({message: err});
    } 
};

exports.deletePro = async (req, res) => {
  
    try {
      const pro = await Product.findById(req.params.id);
      if(!pro) res.status(404).json({ message: 'Not found' });
      else await Product.deleteOne(req.params.id)
    }
    catch(err) {
      res.status(500).json({message: err});
    }
};