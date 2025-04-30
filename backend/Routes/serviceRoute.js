const express = require("express");
const serviceController = require("../Controllers/serviceController");
const router = express.Router();

router.post('/create', serviceController.createService);
router.get('/all', serviceController.getAllServices);

module.exports =router;
