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