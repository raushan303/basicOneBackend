const mongoose = require('mongoose');
const subject = mongoose.model('subject', {
  id: { type: String },
  subjectName: { type: String },
  grade: { type: String },
  chapterCount: { type: Number },
  videoCount: { type: Number },
  videoMins: { type: Number },
  questionCount: { type: Number },
});

const chapter = mongoose.model('chapter', {
  id: { type: String },
  subjectName: { type: String },
  chapterName: { type: String },
  grade: { type: String },
  topicCount: { type: Number },
  videoCount: { type: Number },
  videoMins: { type: Number },
  questionCount: { type: Number },
});

const topic = mongoose.model('topic', {
  id: { type: String },
  subjectName: { type: String },
  chapterName: { type: String },
  topicName: { type: String },
  grade: { type: String },
  conceptCount: { type: Number },
  videoCount: { type: Number },
  videoMins: { type: Number },
  questionCount: { type: Number },
});

const subtopic = mongoose.model('subtopic', {
  id: { type: String },
  url: { type: String },
  subjectName: { type: String },
  chapterName: { type: String },
  topicName: { type: String },
  subtopicName: { type: String },
  grade: { type: String },
  videoMins: { type: Number },
});

const question = mongoose.model('question', {
  id: { type: String },
  question: { type: String },
  options: { type: [] },
  answer: { type: String },
  note: { type: String },
  subjectName: { type: String },
  chapterName: { type: String },
  topicName: { type: String },
  subtopicName: { type: String },
  grade: { type: String },
  videoMins: { type: Number },
});

const user = mongoose.model('user', {
  userInfo: {
    id: {
      type: Number,
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
      type: Array,
    },
    name: {
      type: String,
    },
    //1 unpaid , 2 for paid
    level: {
      type: Number,
    },
    grade: {
      type: Number,
    },
    board: {
      type: String,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  learnt: { type: [] },
  practiced: { type: [] },
});

module.exports = {
  subject: subject,
  chapter: chapter,
  topic: topic,
  subtopic: subtopic,
  question: question,
  user: user,
};
