const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');
const { user } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

router.get('/getSubjectStats/:subjectId', check, async (req, res) => {
  try {
    let tup = await subject.findOne({
      subjectId: req.params.subjectId,
    });
    tup = tup.toObject();
    tup.learntTime = 0;
    tup.practiced = 0;
    let tup2 = await user.findOne(
      {
        'userInfo.userId': req.session.userId,
      },
      {
        learnt: { $elemMatch: { subjectId: req.params.subjectId } },
        practiced: { $elemMatch: { subjectId: req.params.subjectId } },
      }
    );
    tup2 = tup2.toObject();
    tup2.learnt.forEach((obj) => {
      tup.learntTime += obj.learntTime || 0;
    });
    tup2.practiced.forEach((obj) => {
      tup.practiced += 1;
    });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

//Fetch chapter of the given subject
router.get('/getChaptersStats/:subjectId', check, async (req, res) => {
  try {
    let tup = await chapter.find({
      subjectId: req.params.subjectId,
    });

    let tup2 = await user.findOne({
      'userInfo.userId': req.session.userId,
    });

    console.log(tup2, req.session.userId);

    tup2 = tup2.toObject();
    tup.forEach((chapter, i) => {
      tup[i] = tup[i].toObject();
      tup[i].learntTime = 0;
      tup2.learnt.forEach((obj) => {
        if (obj.chapterId === chapter.chapterId) {
          tup[i].learntTime += obj.learntTime || 0;
        }
      });
    });

    tup.forEach((chapter, i) => {
      tup[i].practiced = 0;
      tup2.practiced.forEach((obj) => {
        if (obj.chapterId === chapter.chapterId) {
          tup[i].practiced += 1;
        }
      });
    });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

//Fetch topic of the given subject
router.get('/getTopicsStats/:chapterId', check, async (req, res) => {
  try {
    let tup = await topic.find({
      chapterId: req.params.chapterId,
    });

    let tup2 = await user.findOne({
      'userInfo.userId': req.session.userId,
    });

    tup2 = tup2.toObject();

    tup.forEach((topic, i) => {
      tup[i] = tup[i].toObject();
      tup[i].learntTime = 0;
      tup2.learnt.forEach((obj) => {
        if (obj.topicId === topic.topicId) {
          tup[i].learntTime += obj.learntTime || 0;
        }
      });
    });

    tup.forEach((topic, i) => {
      tup[i].practiced = 0;
      tup2.practiced.forEach((obj) => {
        if (obj.topicId === topic.topicId) {
          tup[i].practiced += 1;
        }
      });
    });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.get('/getSubtopicsStats/:topicId', check, async (req, res) => {
  try {
    let tup = await subtopic.find({
      topicId: req.params.topicId,
    });

    let tup2 = await user.findOne({
      'userInfo.userId': req.session.userId,
    });

    tup2 = tup2.toObject();

    tup.forEach((subtopic, i) => {
      tup[i] = tup[i].toObject();
      tup[i].currentTime = 0;
      tup[i].learntTime = 0;
      tup2.learnt.forEach((obj) => {
        if (obj.subtopicId === subtopic.subtopicId) {
          tup[i].currentTime = obj.currentTime || 0;
          tup[i].learntTime = obj.learntTime || 0;
        }
      });
    });

    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

module.exports = router;
