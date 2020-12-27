const mongoose = require('mongoose');
const subject = mongoose.model('subject', {
  id: { type: String, default: null },
  subjectName: { type: String, required: true },
  grade: { type: String, required: true },
  chapterCount: { type: Number, default: 0 },
  videoCount: { type: Number, default: 0 },
  videoMins: { type: Number, default: 0 },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
});

const chapter = mongoose.model('chapter', {
  id: { type: String, default: null },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  grade: { type: String, required: true },
  topicCount: { type: Number, default: 0 },
  videoCount: { type: Number, default: 0 },
  videoMins: { type: Number, default: 0 },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
});

const topic = mongoose.model('topic', {
  id: { type: String, default: null },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  topicName: { type: String, required: true },
  grade: { type: String, required: true },
  conceptCount: { type: Number, default: 0 },
  videoCount: { type: Number, default: 0 },
  videoMins: { type: Number, default: 0 },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
});

const subtopic = mongoose.model('subtopic', {
  id: { type: String, default: null },
  url: { type: String, required: true },
  subjectName: { type: String, required: true },
  chapterName: { type: String, required: true },
  topicName: { type: String, required: true },
  subtopicName: { type: String, required: true },
  grade: { type: String, required: true },
  videoMins: { type: Number, required: true },
  questionCount: { type: Number, default: 0 },
  image: { type: String, default: null },
});

const question = mongoose.model('question', {
  id: { type: String, default: null },
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
    id: {
      type: Number,
      default: null,
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
    //1 unpaid , 2 for paid
    level: {
      type: Number,
      default: 0,
    },
    grade: {
      type: Number,
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
  learnt: { type: Array, default: [] },
  practiced: { type: Array, default: [] },
});

module.exports = {
  subject: subject,
  chapter: chapter,
  topic: topic,
  subtopic: subtopic,
  question: question,
  user: user,
};
