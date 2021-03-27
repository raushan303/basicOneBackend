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
    // console.log(tup);
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
      res.send({ user: tup, exist: true });
    } else {
      res.send({ user: null, exist: false });
    }
  } catch (e) {
    res.send({ user: null, exist: false });
  }
});

router.post('/signup', async (req, res) => {
  let tup = await user.findOne({ 'userInfo.phoneNo': req.body.phoneNo });
  if (tup) {
    res.send({ exist: true });
  } else {
    res.send({ exist: false });
  }
});

router.post('/register', async (req, res) => {
  try {
    const tup = new user({
      userInfo: req.body,
      learnt: [],
      practiced: [],
    });
    const token = jwt.sign({ _id: tup._id.toString() }, SECRET_TOKEN_KEY);
    tup.userInfo.token = token;
    let tup2 = await user.findOne({ userId: -1 });
    tup2 = tup2.toObject();
    tup.userInfo.userId = tup2.count;
    await user.findOneAndUpdate({ userId: -1 }, { $inc: { count: 1 } });
    await tup.save();
    res.send({ user: tup, success: true });
  } catch (e) {
    res.send({ user: null, success: false });
  }
});

router.get('/showUser', async (req, res) => {
  try {
    console.log('hello','123')
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, SECRET_TOKEN_KEY);
    const tup = await user.findOne({ _id: decoded._id });
    if (tup) {
      res.send({ user: tup, exist: true });
    } else {
      res.send({ user: null, exist: false });
    }
  } catch (e) {
    res.send({ user: null, exist: false });
  }
});

module.exports = router;
