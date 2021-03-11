const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');
const { user } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

//Fetch subject for the given grade
router.get('/getSubjects/:grade', check, async (req, res) => {
  let tup = await subject.find({ grade: req.params.grade });
  res.send(tup);
});

router.get('/getSubjectStat/:subjectId', check, async (req, res) => {
  try {
    let tup = await subject.findOne({
      subjectId: req.params.subjectId,
    });
    tup = tup.toObject();
    tup.learnt = 0;
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
      tup.learnt += obj.learnt;
    });
    tup2.practiced.forEach((obj) => {
      tup.practiced += 1;
    });
    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

//Fetch chapter of the given subject
router.get('/getChapters/:subjectId', check, async (req, res) => {
  try {
    let tup = await chapter.find({
      subjectId: req.params.subjectId,
    });

    let tup2 = await user.findOne({
      'userInfo.userId': req.session.userId,
    });

    console.log(tup2,req.session.userId)

    tup2 = tup2.toObject();
    tup.forEach((chapter, i) => {
      tup[i] = tup[i].toObject();
      tup[i].learnt = 0;
      tup2.learnt.forEach((obj) => {
        if (obj.chapterId === chapter.chapterId) {
          tup[i].learnt += obj.learnt;
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
    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

//Fetch topic of the given subject
router.get('/getTopics/:chapterId', check, async (req, res) => {
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
      tup[i].learnt = 0;
      tup2.learnt.forEach((obj) => {
        if (obj.topicId === topic.topicId) {
          tup[i].learnt += obj.learnt;
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
    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

router.get('/getSubtopics/:topicId', check, async (req, res) => {
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
      tup[i].curTime = 0;
      tup2.learnt.forEach((obj) => {
        if (obj.subtopicId === subtopic.subtopicId) {
          tup[i].curTime = obj.curTime;
        }
      });
    });

    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
