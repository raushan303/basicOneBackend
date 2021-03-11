const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');
const check = require('../middlewares/userMiddleware');
const router = new express.Router();

router.post('/addSubtopic', check, async (req, res) => {
  try {
    let authorId, subtopicId, topicId, chapterId, subjectId, tmpObj;

    tmpObj = await subtopic.findOneAndUpdate({ subtopicId: -1 }, { $inc: { count: 1 } });

    tmpObj = tmpObj.toObject();

    subtopicId = tmpObj.count;

    if (req.body.topicId !== null) {
      topicId = req.body.topicId;
    } else {
      tmpObj = await topic.findOneAndUpdate({ topicId: -1 }, { $inc: { count: 1 } });
      tmpObj = tmpObj.toObject();
      topicId = tmpObj.count;
    }

    if (req.body.chapterId !== null) {
      chapterId = req.body.chapterId;
    } else {
      tmpObj = await chapter.findOneAndUpdate({ chapterId: -1 }, { $inc: { count: 1 } });
      tmpObj = tmpObj.toObject();
      chapterId = tmpObj.count;
    }

    if (req.body.subjectId !== null) {
      subjectId = req.body.subjectId;
    } else {
      tmpObj = await subject.findOneAndUpdate({ subjectId: -1 }, { $inc: { count: 1 } });
      tmpObj = tmpObj.toObject();
      subjectId = tmpObj.count;
    }

    let cur = 0;
    authorId = req.session.userId;
    const itm1 = new subtopic({ ...req.body, authorId, subtopicId, topicId, chapterId, subjectId });
    await itm1.save();

    if (req.body.topicId !== null) {
      await topic.findOneAndUpdate(
        {
          topicId: req.body.topicId,
        },
        {
          $inc: { conceptCount: 1, videoCount: 1, videoMins: req.body.videoMins },
        }
      );
    } else {
      const itm2 = new topic({ ...req.body, topicId, chapterId, subjectId });
      await itm2.save();
      cur = 1;
    }

    if (req.body.chapterId !== null) {
      await chapter.findOneAndUpdate(
        {
          chapterId: req.body.chapterId,
        },
        {
          $inc: { topicCount: cur, videoCount: 1, videoMins: req.body.videoMins },
        }
      );
      cur = 0;
    } else {
      const itm3 = new chapter({ ...req.body, chapterId, subjectId });
      await itm3.save();
      cur = 1;
    }

    if (req.body.subjectId !== null) {
      await subject.findOneAndUpdate(
        {
          subjectId: req.body.subjectId,
        },
        {
          $inc: { chapterCount: cur, videoCount: 1, videoMins: req.body.videoMins },
        }
      );
      cur = 0;
    } else {
      const itm4 = new subject({ ...req.body, subjectId });
      await itm4.save();
      cur = 1;
    }

    res.send({ subtopic: itm1, success: true });
  } catch (e) {
    res.send({ subtopic: null, success: false, error: e });
  }
});

router.get('/getVideoId', check, async (req, res) => {
  try {
    const itm = await subtopic.findOne({ subtopicId: -1 });
    res.send(itm);
  } catch (e) {
    res.send('error');
  }
});

module.exports = router;
