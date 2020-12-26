const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');
const { user } = require('../models/models');

const check = require('../middlewares/middleware');
const router = new express.Router();

//Fetch subject for the given grade
router.get('/getSubjects/:grade', check, async (req, res) => {
  let tup = await subject.find({ grade: req.params.grade });
  res.send(tup);
});

router.get('/getSubjectStat/:grade/:subject', check, async (req, res) => {
  try {
    let tup = await subject.findOne({
      grade: req.params.grade,
      subjectName: req.params.subject,
    });
    tup = tup.toObject();
    tup.learnt = 0;
    tup.practiced = 0;
    let tup2 = await user.findOne({
      _id: req.session._id,
    });
    tup2 = tup2.toObject();
    tup2.learnt.forEach((obj) => {
      if (obj.subjectName === req.params.subject) {
        tup.learnt += obj.learnt;
      }
    });
    tup2.practiced.forEach((obj) => {
      if (obj.subjectName === req.params.subject) {
        tup.practiced += 1;
      }
    });
    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

//Fetch chapter of the given subject
router.get('/getChapters/:grade/:subject', check, async (req, res) => {
  try {
    let tup = await chapter.find({
      grade: req.params.grade,
      subjectName: req.params.subject,
    });

    let tup2 = await user.findOne({
      _id: req.session._id,
    });

    tup2 = tup2.toObject();
    tup.forEach((chapter, i) => {
      tup[i].learnt = 0;
      tup2.learnt.forEach((obj) => {
        if (
          obj.subjectName === req.params.subject &&
          obj.chapterName === chapter.chapterName
        ) {
          tup[i].learnt += obj.learnt;
        }
      });
    });

    tup.forEach((chapter, i) => {
      tup[i].practiced = 0;
      tup2.practiced.forEach((obj) => {
        if (
          obj.subjectName === req.params.subject &&
          obj.chapterName === chapter.chapterName
        ) {
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
router.get('/getTopics/:grade/:subject/:chapter', check, async (req, res) => {
  try {
    let tup = await topic.find({
      grade: req.params.grade,
      subjectName: req.params.subject,
      chapterName: req.params.chapter,
    });

    let tup2 = await user.findOne({
      _id: req.session._id,
    });

    tup2 = tup2.toObject();

    tup.forEach((topic, i) => {
      tup[i].learnt = 0;
      tup2.learnt.forEach((obj) => {
        if (
          obj.subjectName === req.params.subject &&
          obj.chapterName === req.params.chapter &&
          obj.topicName === topic.topicName
        ) {
          tup[i].learnt += obj.learnt;
        }
      });
    });

    tup.forEach((topic, i) => {
      tup[i].practiced = 0;
      tup2.practiced.forEach((obj) => {
        if (
          obj.subjectName === req.params.subject &&
          obj.chapterName === req.params.chapter &&
          obj.topicName === topic.topicName
        ) {
          tup[i].practiced += 1;
        }
      });
    });
    res.send(tup);
  } catch (e) {
    res.send(null);
  }
});

router.get(
  '/getSubtopics/:grade/:subject/:chapter/:topic',
  check,
  async (req, res) => {
    try {
      let tup = await subtopic.find({
        grade: req.params.grade,
        subjectName: req.params.subject,
        chapterName: req.params.chapter,
        topicName: req.params.topic,
      });

      let tup2 = await user.findOne({
        _id: req.session._id,
      });

      tup2 = tup2.toObject();

      tup.forEach((subtopic, i) => {
        tup[i].curTime = 0;
        tup2.learnt.forEach((obj) => {
          if (
            obj.subjectName === req.params.subject &&
            obj.chapterName === req.params.chapter &&
            obj.topicName === req.params.topic &&
            obj.subtopicName === subtopic.subtopicName
          ) {
            tup[i].curTime = obj.curTime;
          }
        });
      });

      res.send(tup);
    } catch (e) {
      res.send(null);
    }
  }
);

module.exports = router;
