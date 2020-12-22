const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://raushan303:8800903453@cluster0.s9gwb.mongodb.net/base?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
