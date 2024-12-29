const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./user");

const videoCardSchema = new mongoose.Schema({
  strTrack: { type: String, required: true, minlength: 1, maxlength: 300 },
  strMusicVid: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not Valid",
    },
  },
  strTrackThumb: {
    type: String,
    default: null,
  },
  owner: { type: mongoose.ObjectId, ref: User, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("videoCard", videoCardSchema);
