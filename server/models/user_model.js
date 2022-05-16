const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  phone: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  wallet_address:{
      type: String,
  },
  user_check : {
    type:Boolean,
  }

});

const User = mongoose.model("users", UserSchema);

module.exports = User;
