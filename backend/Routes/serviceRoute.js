const express = require("express");
const serviceController = require("../Controllers/serviceController");
const router = express.Router();

router.post('/create', serviceController.createService);

module.exports =router;
