const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');
const check = require('../middlewares/middleware');
const router = new express.Router();

router.post('/addSubtopic', async (req, res) => {
  try {
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
  } catch (e) {
    res.send(null);
  }
});

module.exports = router;
