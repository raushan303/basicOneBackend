const express = require('express');
const { user } = require('../models/models');
const { watchedSubtopic } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

router.post('/addLearn', check, async (req, res) => {
  try {
    let tup1 = await user.update(
      { 'userInfo.userId': req.session.userId },
      { $pull: { learnt: { subtopicId: req.body.subtopicId } } }
    );
    const newObj = new watchedSubtopic(req.body);
    await user.update({ 'userInfo.userId': req.session.userId }, { $push: { learnt: newObj } });

    res.send({ data: newObj, success: true });
  } catch (e) {
    res.send({ data: null, success: false });
  }
});

router.post('/addPractice', check, async (req, res) => {
  try {
    let tup = await user.update({ _id: req.session._id }, { $push: { practiced: req.body } });
    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
