const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');
const { user } = require('../models/models');

const check = require('../middlewares/middleware');
const router = new express.Router();

//Fetch subject for the given grade
router.get('/getSubjects/:grade', async (req, res) => {
  let tup = await subject.find({ grade: req.params.grade });
  res.send(tup);
});

router.get('/getSubjectStat/:grade/:subject', async (req, res) => {
  let tup = await subject.find({
    grade: req.params.grade,
    subjectName: req.params.subject,
  });
  tup.learnt = 0;
  tup.practiced = 0;
  let tup2 = await user.find({
    id: req.body.id,
  });
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
});

//Fetch chapter of the given subject
router.get('/getChapters/:grade/:subject', async (req, res) => {
  let tup = await chapter.find({
    grade: req.params.grade,
    subjectName: req.params.subject,
  });

  let tup2 = await user.find({
    id: req.body.id,
  });

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
});

//Fetch topic of the given subject
router.get('/getTopics/:grade/:subject/:chapter', async (req, res) => {
  let tup = await topic.find({
    grade: req.params.grade,
    subjectName: req.params.subject,
    chapterName: req.params.chapter,
  });

  let tup2 = await user.find({
    id: req.body.id,
  });

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
});

router.get(
  '/getSubtopics/:grade/:subject/:chapter/:topic',
  async (req, res) => {
    let tup = await subtopic.find({
      grade: req.params.grade,
      subjectName: req.params.subject,
      chapterName: req.params.chapter,
      topicName: req.params.topic,
    });

    let tup2 = await user.find({
      id: req.body.id,
    });

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
  }
);

router.post('/addSubtopic', async (req, res) => {
  console.log(req.body, 'body');
  const itm1 = new subtopic({
    id: req.body.id,
    url: req.body.url,
    subjectName: req.body.subjectName,
    chapterName: req.body.chapterName,
    topicName: req.body.topicName,
    subtopicName: req.body.subtopicName,
    grade: req.body.grade,
    videoMins: req.body.videoMins,
  });
  await itm1.save();

  let cur = 0;

  const topicObj = await topic.findOne({
    subjectName: req.body.subjectName,
    chapterName: req.body.chapterName,
    topicName: req.body.topicName,
    grade: req.body.grade,
  });

  console.log(topicObj, 'topic');

  if (topicObj) {
    await topic.findOneAndUpdate(
      {
        subjectName: req.body.subjectName,
        chapterName: req.body.chapterName,
        topicName: req.body.topicName,
        grade: req.body.grade,
      },
      {
        conceptCount: topicObj.conceptCount + 1,
        videoCount: topicObj.videoCount + 1,
        videoMins: topicObj.videoMins + req.body.videoMins,
      }
    );
  } else {
    const itm2 = new topic({
      id: req.body.id,
      subjectName: req.body.subjectName,
      chapterName: req.body.chapterName,
      topicName: req.body.topicName,
      grade: req.body.grade,
      conceptCount: 1,
      videoCount: 1,
      videoMins: req.body.videoMins,
      questionCount: 0,
    });
    cur = 1;
    await itm2.save();
  }

  const chapterObj = await chapter.findOne({
    subjectName: req.body.subjectName,
    chapterName: req.body.chapterName,
    grade: req.body.grade,
  });

  console.log(chapterObj, 'chap');

  if (chapterObj) {
    await chapter.findOneAndUpdate(
      {
        subjectName: req.body.subjectName,
        chapterName: req.body.chapterName,
        grade: req.body.grade,
      },
      {
        topicCount: chapterObj.topicCount + cur,
        videoCount: chapterObj.videoCount + 1,
        videoMins: chapterObj.videoMins + req.body.videoMins,
      }
    );
    cur = 0;
  } else {
    const itm3 = new chapter({
      id: req.body.id,
      subjectName: req.body.subjectName,
      chapterName: req.body.chapterName,
      grade: req.body.grade,
      topicCount: 1,
      videoCount: 1,
      videoMins: req.body.videoMins,
      questionCount: 0,
    });
    cur = 1;
    await itm3.save();
  }

  const subjectObj = await subject.findOne({
    subjectName: req.body.subjectName,
    grade: req.body.grade,
  });

  console.log(subjectObj, 'sub');
  if (subjectObj) {
    await subject.findOneAndUpdate(
      {
        subjectName: req.body.subjectName,
        grade: req.body.grade,
      },
      {
        chapterCount: subjectObj.chapterCount + cur,
        videoCount: subjectObj.videoCount + 1,
        videoMins: subjectObj.videoMins + req.body.videoMins,
      }
    );
    cur = 0;
  } else {
    const itm4 = new subject({
      id: req.body.id,
      subjectName: req.body.subjectName,
      grade: req.body.grade,
      chapterCount: 1,
      videoCount: 1,
      videoMins: req.body.videoMins,
      questionCount: 0,
    });
    cur = 1;
    await itm4.save();
  }

  res.send(itm1);
});

module.exports = router;
