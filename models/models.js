const mongoose = require('mongoose');

const subject = mongoose.model('subject', {
  subjectId: { type: Number, required: true },
  subjectName: { type: String, required: true },
  grade: { type: String, required: true },
  chapterCount: { type: Number, default: 1 },
  videoCount: { type: Number, default: 1 },
  videoMins: { type: Number, default: 0 },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
  count: {
    type: Number,
  },
});

const chapter = mongoose.model('chapter', {
  chapterId: { type: Number, required: true },
  subjectId: { type: Number, required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  grade: { type: String, required: true },
  topicCount: { type: Number, default: 1 },
  videoCount: { type: Number, default: 1 },
  videoMins: { type: Number, default: 0 },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
  count: {
    type: Number,
  },
});

const topic = mongoose.model('topic', {
  topicId: { type: Number, required: true },
  subjectId: { type: Number, required: true },
  chapterId: { type: Number, required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  topicName: { type: String, required: true },
  grade: { type: String, required: true },
  conceptCount: { type: Number, default: 1 },
  videoCount: { type: Number, default: 1 },
  videoMins: { type: Number, default: 0 },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
  count: {
    type: Number,
  },
});

const subtopic = mongoose.model('subtopic', {
  authorId: { type: Number, required: true },
  subtopicId: { type: Number, required: true },
  subjectId: { type: Number, required: true },
  chapterId: { type: Number, required: true },
  topicId: { type: Number, required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  topicName: { type: String, required: true },
  subtopicName: { type: String, required: true },
  url: { type: String, required: true },
  note: { type: String, default: null },
  grade: { type: String, required: true },
  videoMins: { type: Number, required: true },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
  count: {
    type: Number,
  },
});

/* 
  comment array
  comment:[
    {
      author:{},
      question:{},
      reply:[{},{}]
    }
  ]
*/

const question = mongoose.model('question', {
  questionId: { type: Number, required: true },
  question: { type: String, required: true },
  options: { type: Array, required: true },
  answer: { type: String, required: true },
  note: { type: String, default: null },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  topicName: { type: String, required: true },
  subtopicName: { type: String, required: true },
  grade: { type: String, required: true },
});

const user = mongoose.model('user', {
  userInfo: {
    userId: {
      type: Number,
      default: 0,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    level: {
      type: Number,
      default: 0,
    },
    grade: {
      type: String,
      required: true,
    },
    board: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
  },
  count: {
    type: Number,
  },
  learnt: { type: Array, default: [] },
  practiced: { type: Array, default: [] },
  comment: { type: Array, default: [] },
});

const comment = mongoose.model('comment', {
  subtopicId: { type: Number, required: true },
  commentId: { type: Number, required: true },
  userId: { type: Number, required: true },
  likeCount: { type: Number, default: 0 },
  disLikeCount: { type: Number, default: 0 },
  replyCount: { type: Number, default: 0 },
  imageList: { type: Array, default: [] },
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Number, default: 0 },
  userLikeStatus: { type: Array, default: [] },
  count: {
    type: Number,
  },
});

const reply = mongoose.model('reply', {
  subtopicId: { type: Number, required: true },
  commentId: { type: Number, required: true },
  replyId: { type: Number, required: true },
  userId: { type: Number, required: true },
  likeCount: { type: Number, default: 0 },
  disLikeCount: { type: Number, default: 0 },
  imageList: { type: Array, default: [] },
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Number, default: 0 },
  userLikeStatus: { type: Array, default: [] },
  count: {
    type: Number,
  },
});

const userCommentStatus = mongoose.model('commentStatus', {
  userId: { type: Number, required: true },
  liked: { type: Number, default: 0 },
  disLiked: { type: Number, default: 0 },
});

/* 
  comment array
  comment:[
    {
      author:{},
      question:{},
      subtopic:{},
      reply:[{},{}]
    }
  ]
*/

const watchedSubtopic = mongoose.model('watchedSubtopic', {
  subtopicId: { type: Number, required: true },
  subjectId: { type: Number, required: true },
  chapterId: { type: Number, required: true },
  topicId: { type: Number, required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  topicName: { type: String, required: true },
  subtopicName: { type: String, required: true },
  videoMins: { type: Number, required: true },
  currentTime: { type: Number, default: 0 },
  learntTime: { type: Number, default: 0 },
});

/*
  learnt Array
  learnt:[
    {
      subtopic:{},
      currentTime:Int,
      learnt:Int
    }
  ]
*/

/*
  practiced Array
  practiced:[
    {
      question:{},
      accuracy:Int(1 or 0)
    }
  ]
*/

module.exports = {
  subject: subject,
  chapter: chapter,
  topic: topic,
  subtopic: subtopic,
  question: question,
  user: user,
  watchedSubtopic: watchedSubtopic,
  comment: comment,
  reply: reply,
  userCommentStatus: userCommentStatus,
};
