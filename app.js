var express = require('express');
var cors = require('cors');
require('./db/mongoose');
const { SECRET_SESSION_KEY } = require('./SECRET_KEYS');

const app = express();
const port = process.env.PORT || 3001;

// To enable cors
app.use(cors());

app.use(express.json());

var session = require('express-session');
app.use(session({ secret: SECRET_SESSION_KEY }));

app.use(express.static(__dirname + '/public'));

const coursesRouter = require('./routers/courses');
app.use(coursesRouter);

const userRouter = require('./routers/user');
app.use(userRouter);

const addVideoRouter = require('./routers/addVideo');
app.use(addVideoRouter);

const userStatusRouter = require('./routers/userStaus');
app.use(userStatusRouter);

app.listen(port, function () {
  console.log('Started on PORT 3001');
});
