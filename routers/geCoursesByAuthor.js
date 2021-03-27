const express = require('express');
const { subtopic } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

router.get('/getSubtopicsByGrade/:authorId/:grade', check, async (req, res) => {
  try {
    let subtopicList = await subtopic.find({
      grade: req.params.grade,
      authorId: req.params.authorId,
    });

    let subjectList = [];
    let map = {};

    subtopicList.forEach((obj) => {
      if (!map[obj.subjectId]) {
        subjectList.push({ subjectName: obj.subjectName, subjectId: obj.subjectId });
        map[obj.subjectId] = true;
      }
    });

    res.send({ data: { subtopicList, subjectList }, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.get('/getSubtopicsBySubject/:authorId/:subjectId', check, async (req, res) => {
  try {
    let subtopicList = await subtopic.find({
      subjectId: req.params.subjectId,
      authorId: req.params.authorId,
    });

    let chapterList = [];
    let map = {};

    subtopicList.forEach((obj) => {
      if (!map[obj.chapterId]) {
        chapterList.push({ chapterName: obj.chapterName, chapterId: obj.chapterId });
        map[obj.chapterId] = true;
      }
    });

    res.send({ data: { subtopicList, chapterList }, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.get('/getSubtopicsByChapter/:authorId/:chapterId', check, async (req, res) => {
  try {
    let subtopicList = await subtopic.find({
      chapterId: req.params.chapterId,
      authorId: req.params.authorId,
    });

    let topicList = [];
    let map = {};

    subtopicList.forEach((obj) => {
      if (!map[obj.topicId]) {
        topicList.push({ topicName: obj.topicName, topicId: obj.topicId });
        map[obj.topicId] = true;
      }
    });

    res.send({ data: { subtopicList, topicList }, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.get('/getSubtopicsByTopic/:authorId/:topicId', check, async (req, res) => {
  try {
    let subtopicList = await subtopic.find({
      topicId: req.params.topicId,
      authorId: req.params.authorId,
    });

    res.send({ data: { subtopicList }, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

module.exports = router;
