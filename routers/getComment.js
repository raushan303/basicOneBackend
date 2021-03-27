const express = require('express');
const { comment, reply, userCommentStatus } = require('../models/models');

const check = require('../middlewares/userMiddleware');
const router = new express.Router();

router.get('/getComments/:subtopicId', check, async (req, res) => {
  try {
    console.log(typeof req.params.subtopicId);
    let tup = await comment.aggregate([
      {
        $match: { subtopicId: parseInt(req.params.subtopicId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'userInfo.userId',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          name: '$userDetails.userInfo.name',
          subtopicId: 1,
          commentId: 1,
          userId: 1,
          likeCount: 1,
          disLikeCount: 1,
          replyCount: 1,
          imageList: 1,
          date: 1,
          title: 1,
          description: 1,
          priority: 1,
          userLikeStatus: {
            $filter: {
              input: '$userLikeStatus',
              as: 'userStatus',
              cond: { $eq: ['$$userStatus.userId', req.session.userId] },
            },
          },
        },
      },
    ]);

    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.post('/uploadComments', check, async (req, res) => {
  try {
    let tmpObj = await comment.findOneAndUpdate({ commentId: -1 }, { $inc: { count: 1 } });
    tmpObj = tmpObj.toObject();
    const commentId = tmpObj.count;
    const userId = req.session.userId;
    let tup = new comment({ ...req.body, commentId, userId });
    await tup.save();
    tup = tup.toObject();
    res.send({ data: { ...tup, name: req.session.userInfo.name }, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.post('/deleteComments', check, async (req, res) => {
  try {
    let tup = await comment.findOneAndDelete({ commentId: req.body.commentId });
    await reply.deleteMany({ commentId: req.body.commentId });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.post('/editComments', check, async (req, res) => {
  try {
    let tup = await comment.findOneAndUpdate(
      { commentId: req.body.commentId },
      { title: req.body.title, description: req.body.description, imageList: req.body.imageList }
    );
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.post('/updateCommentLikeStatus', check, async (req, res) => {
  try {
    let changeLike = 0,
      changeDisLike = 0;

    let oldObj = await comment.findOne(
      { commentId: req.body.commentId },
      { userLikeStatus: { $elemMatch: { userId: req.session.userId } } }
    );
    oldObj = oldObj.toObject();

    const userId = req.session.userId;
    const newObj = new userCommentStatus({ ...req.body, userId });

    if (oldObj.userLikeStatus.length) {
      await comment.update(
        { commentId: req.body.commentId },
        { $pull: { userLikeStatus: { userId: req.session.userId } } }
      );
      const tmpObj = oldObj.userLikeStatus[0];
      if (tmpObj.liked && !newObj.liked) changeLike = -1;
      if (!tmpObj.liked && newObj.liked) changeLike = 1;
      if (tmpObj.disLiked && !newObj.disLiked) changeDisLike = -1;
      if (!tmpObj.disLiked && newObj.disLiked) changeDisLike = 1;
    } else {
      if (req.body.liked) changeLike = 1;
      if (req.body.disLiked) changeDisLike = 1;
    }

    await comment.update({ commentId: req.body.commentId }, { $push: { userLikeStatus: newObj } });

    if (changeLike)
      await comment.findOneAndUpdate(
        { commentId: req.body.commentId },
        { $inc: { likeCount: changeLike } }
      );
    if (changeDisLike)
      await comment.findOneAndUpdate(
        { commentId: req.body.commentId },
        { $inc: { disLikeCount: changeDisLike } }
      );

    res.send({ data: newObj, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.get('/getReply/:commentId', check, async (req, res) => {
  try {
    let tup = await reply.aggregate([
      {
        $match: { commentId: parseInt(req.params.commentId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'userInfo.userId',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          name: '$userDetails.userInfo.name',
          subtopicId: 1,
          commentId: 1,
          replyId: 1,
          userId: 1,
          likeCount: 1,
          disLikeCount: 1,
          imageList: 1,
          date: 1,
          title: 1,
          description: 1,
          priority: 1,
          userLikeStatus: {
            $filter: {
              input: '$userLikeStatus',
              as: 'userStatus',
              cond: { $eq: ['$$userStatus.userId', req.session.userId] },
            },
          },
        },
      },
    ]);
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.post('/uploadReply', check, async (req, res) => {
  try {
    let tmpObj = await reply.findOneAndUpdate({ replyId: -1 }, { $inc: { count: 1 } });
    tmpObj = tmpObj.toObject();
    const replyId = tmpObj.count;
    const userId = req.session.userId;
    let tup = new reply({ ...req.body, replyId, userId });
    await comment.findOneAndUpdate({ commentId: req.body.commentId }, { $inc: { replyCount: 1 } });
    await tup.save();
    tup = tup.toObject();
    res.send({ data: { ...tup, name: req.session.userInfo.name }, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.post('/editReply', check, async (req, res) => {
  try {
    let tup = await reply.findOneAndUpdate(
      { replyId: req.body.replyId },
      { title: req.body.title, description: req.body.description, imageList: req.body.imageList }
    );
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.post('/deleteReply', check, async (req, res) => {
  try {
    let tup = await reply.findOneAndDelete({ replyId: req.body.replyId });
    res.send({ data: tup, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

router.post('/updateReplyLikeStatus', check, async (req, res) => {
  try {
    let changeLike = 0,
      changeDisLike = 0;

    let oldObj = await reply.findOne(
      { replyId: req.body.replyId },
      { userLikeStatus: { $elemMatch: { userId: req.session.userId } } }
    );
    console.log(oldObj, req.body);
    oldObj = oldObj.toObject();

    const userId = req.session.userId;
    const newObj = new userCommentStatus({ ...req.body, userId });

    if (oldObj.userLikeStatus.length) {
      await reply.update(
        { replyId: req.body.replyId },
        { $pull: { userLikeStatus: { userId: req.session.userId } } }
      );
      const tmpObj = oldObj.userLikeStatus[0];
      if (tmpObj.liked && !newObj.liked) changeLike = -1;
      if (!tmpObj.liked && newObj.liked) changeLike = 1;
      if (tmpObj.disLiked && !newObj.disLiked) changeDisLike = -1;
      if (!tmpObj.disLiked && newObj.disLiked) changeDisLike = 1;
    } else {
      if (req.body.liked) changeLike = 1;
      if (req.body.disLiked) changeDisLike = 1;
    }

    await reply.update({ replyId: req.body.replyId }, { $push: { userLikeStatus: newObj } });

    if (changeLike)
      await reply.findOneAndUpdate(
        { replyId: req.body.replyId },
        { $inc: { likeCount: changeLike } }
      );
    if (changeDisLike)
      await reply.findOneAndUpdate(
        { replyId: req.body.replyId },
        { $inc: { disLikeCount: changeDisLike } }
      );

    res.send({ data: newObj, success: true });
  } catch (e) {
    res.send({ data: null, success: false, error: e });
  }
});

module.exports = router;
