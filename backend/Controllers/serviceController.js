const Service = require('../Models/serviceModel')

exports.createService = async (req, res) => {
    try {
      const service = new Service(req.body);
      await service.save();
      res.status(201).json({ success: true, service });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  exports.getAllServices = async (req, res) => {
      try {
        const services = await Service.find({});
      
        res.json({ success: true, services });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    };