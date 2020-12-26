const express = require('express');
const { user } = require('../models/models');
const { question } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

router.post('/getTestQuestion', check, async (req, res) => {
  try {
    let tup1 = await user.find({
      _id: req.session._id,
      'practiced.subjectName': req.body.subjectName,
    });
    // let tup2 = await user.update(
    //   { _id: req.session._id },
    //   { $push: { learnt: req.body } }
    // );
    // console.log(tup1, tup2);

    res.send(tup1);
  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
