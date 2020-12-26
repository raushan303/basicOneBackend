const bcrypt = require('bcryptjs');
const { user } = require('../models/models');
const { SECRET_TOKEN_KEY } = require('../SECRET_KEYS');

const jwt = require('jsonwebtoken');

// A middleware to check the validity of the token recieved from the frontend in headers.

// The user ID and Token are stored in session storage ( Using security keys ) to to reduce the repetetive fetching of user details from databse in furthur queries.

async function check(req, res, next) {
  try {
    const token = req.header('authorization');
    const decoded = jwt.verify(token, SECRET_TOKEN_KEY);
    const tup = await user.findOne({ _id: decoded._id });
    tup = tup.toObject();
    if (tup.userInfo.level===0) {
      req.session._id = decoded._id;
      next();
    } else {
      res
        .status(404)
        .json({ message: 'You are not authorized to view this page' });
    }
  } catch (e) {
    res
      .status(404)
      .json({ message: 'You are not authorized to view this page' });
  }
}
module.exports = check;
