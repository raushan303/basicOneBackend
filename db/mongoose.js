const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://raushan303:8800903453@cluster0.s9gwb.mongodb.net/basicOneDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
