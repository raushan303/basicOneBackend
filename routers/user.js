const express = require('express');

const { user } = require('../models/models');

const check = require('../middlewares/middleware');
const router = new express.Router();

const { SECRET_TOKEN_KEY } = require('../SECRET_KEYS');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/login', async (req, res) => {
  let tup = await user.find({
    userInfo: { phoneNo: req.phoneNo, password: req.password },
  });
  if (tup) {
    const token = jwt.sign({ _id: tup._id.toString() }, SECRET_TOKEN_KEY);
    tup.userInfo.token = token;
    await user.findOneAndUpdate(
      {
        userInfo: { phoneNo: req.phoneNo, password: req.password },
      },
      {
        userInfo: {
          token: token,
        },
      }
    );
  }
  res.send(tup);
});

router.get('/signup', async (req, res) => {
  let tup = await user.find({ userInfo: { phoneNo: req.phoneNo } });
  res.send(tup);
});

router.get('/register', async (req, res) => {
  const tup = new user({
    userInfo: req.userInfo,
    learnt: [],
    practiced: [],
  });
  const token = jwt.sign({ _id: tup._id.toString() }, SECRET_TOKEN_KEY);
  tup.userInfo.token = token;
  res.send(tup);
});

module.exports = router;
