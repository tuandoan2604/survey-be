const express = require('express');
const http_status = require('http-status');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').get((req, res) => {
  return res.status(http_status.OK).json({
    mes: 'Home Page',
  });
});

module.exports = router;
