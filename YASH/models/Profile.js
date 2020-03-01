const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  status: {
    type: String,
    required: true
  },
  company: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
