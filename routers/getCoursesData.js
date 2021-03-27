const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

//Fetch subject for the given grade
router.get('/getSubjects/:grade', check, async (req, res) => {
  try {
    let tup = await subject.find({ grade: req.params.grade });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

//Fetch chapter of the given subject
router.get('/getChapters/:subjectId', check, async (req, res) => {
  try {
    let tup = await chapter.find({
      subjectId: req.params.subjectId,
    });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

//Fetch topic of the given subject
router.get('/getTopics/:chapterId', check, async (req, res) => {
  try {
    let tup = await topic.find({
      chapterId: req.params.chapterId,
    });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.get('/getSubtopics/:topicId', check, async (req, res) => {
  try {
    let tup = await subtopic.find({
      topicId: req.params.topicId,
    });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

module.exports = router;
