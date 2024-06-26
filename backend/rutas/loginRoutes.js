const express = require('express');
const router = express.Router();
const passport = require("../auth/passport");

const loginController = require('../controladores/loginController');

router.post('/', loginController.login);

module.exports = router;
