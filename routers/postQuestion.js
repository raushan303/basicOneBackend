const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');
const { question } = require('../models/models');
const check = require('../middlewares/adminMiddleware');
const router = new express.Router();

router.post('/addQuestion', check, async (req, res) => {
  try {
    const itm = await subtopic.findOne({
      subjectName: req.body.subjectName,
      chapterName: req.body.chapterName,
      topicName: req.body.topicName,
      subtopicName: req.body.subtopicName,
      grade: req.body.grade,
    });
    if (!itm) {
      res.send(null);
    }

    const itm1 = new question({
      id: req.body.id,
      question: req.body.question,
      options: req.body.options,
      answer: req.body.answer,
      note: req.body.note,
      subjectName: req.body.subjectName,
      chapterName: req.body.chapterName,
      topicName: req.body.topicName,
      subtopicName: req.body.subtopicName,
      grade: req.body.grade,
    });
    await itm1.save();

    await topic.findOneAndUpdate(
      {
        subjectName: req.body.subjectName,
        chapterName: req.body.chapterName,
        topicName: req.body.topicName,
        grade: req.body.grade,
      },
      {
        questionCount: topicObj.questionCount + 1,
      }
    );

    await chapter.findOneAndUpdate(
      {
        subjectName: req.body.subjectName,
        chapterName: req.body.chapterName,
        grade: req.body.grade,
      },
      {
        questionCount: chapterObj.questionCount + 1,
      }
    );

    await subject.findOneAndUpdate(
      {
        subjectName: req.body.subjectName,
        grade: req.body.grade,
      },
      {
        questionCount: subjectObj.questionCount + 1,
      }
    );

    res.send(itm1);
  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
