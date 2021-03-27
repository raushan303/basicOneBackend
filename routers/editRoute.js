const express = require('express');
const { subject } = require('../models/models');
const { chapter } = require('../models/models');
const { topic } = require('../models/models');
const { subtopic } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

router.get('/editRoute', async (req, res) => {
  try {
    // for removing the subject field

    // let tmpObj = await subtopic.find({}).distinct('subtopicId');
    // await subtopic.updateMany({ subtopicId: { $in: tmpObj } }, { $unset: { subjectName: '' } });

    // for adding the subject field

    // let tup1 = await chapter.find({});
    // tup1.forEach(async (obj) => {
    //   const response1 = await subject.findOne({ subjectId: obj.subjectId });
    //   if (response1)
    //     await chapter.findOneAndUpdate(
    //       { chapterId: obj.chapterId },
    //       { subjectName: response1.subjectName }
    //     );
      // const response2 = await chapter.findOne({ chapterId: obj.chapterId });
      // if (response2)
      //   await topic.findOneAndUpdate(
      //     { topicId: obj.topicId },
      //     { chapterName: response2.chapterName }
      //   );
      // const response3 = await topic.findOne({ topicId: obj.topicId });
      // if (response3)
      //   await subtopic.findOneAndUpdate(
      //     { subtopicId: obj.subtopicId },
      //     { topicName: response3.topicName }
      //   );
    // });

    res.send({ success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

module.exports = router;
