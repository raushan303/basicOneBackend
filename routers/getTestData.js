const express = require('express');
const { user } = require('../models/models');
const { question } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

router.get('/getTestQuestion/:subject', check, async (req, res) => {
  try {
    let tup1 = await user.findOne(
      {
        _id: req.session._id,
      },
      {
        learnt: { $elemMatch: { subjectName: req.params.subject } },
      }
    );
    tup1 = tup1.toObject();

    let tup2 = await question.find({
      subjectName: req.params.subject,
    });

    let tup = [];

    tup2.forEach((obj1) => {
      let skip = 0;
      tup1.learnt.forEach((obj2) => {
        if (
          obj1.subjectName === obj2.subjectName &&
          obj1.chapterName === obj2.chapterName &&
          obj1.topicName === obj2.topicName &&
          obj1.subtopicName === obj2.subtopicName
        ) {
          skip = 1;
        }
      });
      if (!skip) {
        tup.push(obj1);
      }
    });

    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
