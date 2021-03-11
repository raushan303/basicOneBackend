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
  url: { type: String, required: true },
  note: { type: String, default: null },
  subtopicName: { type: String, required: true },
  grade: { type: String, required: true },
  videoMins: { type: Number, required: true },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
  comment: { type: Array, default: [] },
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
};
