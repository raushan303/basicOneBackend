const express = require('express');
const { user } = require('../models/models');

const check = require('../middlewares/middleware');
const router = new express.Router();

router.post('/addLearn', check, async (req, res) => {
  try {

    let tup1 = await user.update(
      { _id: req.session._id },
      { $pull: { learnt: { _id: req.body._id } } }
    );
    let tup2 = await user.update(
      { _id: req.session._id },
      { $push: { learnt: req.body } }
    );
    console.log(tup1, tup2);

    res.send(tup2);
  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
