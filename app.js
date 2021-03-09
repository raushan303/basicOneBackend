var express = require('express');
var cors = require('cors');
require('./db/mongoose');

const { SECRET_SESSION_KEY } = require('./SECRET_KEYS');

const app = express();
const port = process.env.PORT || 3001;

// To enable cors
app.use(cors());

app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload());
// app.use(uploadRouter)

var session = require('express-session');
app.use(session({ secret: SECRET_SESSION_KEY }));

app.use(express.static(__dirname + '/public'));

const coursesRouter = require('./routers/getCoursesData');
app.use(coursesRouter);

const userRouter = require('./routers/user');
app.use(userRouter);

const addVideoRouter = require('./routers/postVideo');
app.use(addVideoRouter);

const addQuestionRouter = require('./routers/postQuestion');
app.use(addQuestionRouter);

const userStatusRouter = require('./routers/postUserActivity');
app.use(userStatusRouter);

app.listen(port, function () {
  console.log('Started on PORT 3001');
});
