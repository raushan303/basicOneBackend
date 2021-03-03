const express = require('express');

const { user } = require('../models/models');
const router = new express.Router();

const { SECRET_TOKEN_KEY } = require('../SECRET_KEYS');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  try {
    let tup = await user.findOne({
      'userInfo.phoneNo': req.body.phoneNo,
      'userInfo.password': req.body.password,
    });
    console.log(tup);
    if (tup) {
      const token = jwt.sign({ _id: tup._id.toString() }, SECRET_TOKEN_KEY);
      tup.userInfo.token = token;
      await user.findOneAndUpdate(
        {
          'userInfo.phoneNo': req.body.phoneNo,
          'userInfo.password': req.body.password,
        },
        {
          'userInfo.token': token,
        }
      );
    }
    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

router.post('/signup', async (req, res) => {
  let tup = await user.findOne({ 'userInfo.phoneNo': req.body.phoneNo });
  res.send(tup);
});

router.post('/register', async (req, res) => {
  try {
    const tup = new user({
      userInfo: req.body.userInfo,
      learnt: [],
      practiced: [],
    });
    // console.log(tup, req.body.userInfo, 'hi');
    const token = jwt.sign({ _id: tup._id.toString() }, SECRET_TOKEN_KEY);
    tup.userInfo.token = token;
    await tup.save();
    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
