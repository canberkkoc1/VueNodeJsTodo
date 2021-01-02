const mongoose = require("mongoose");

const Schema = require("mongoose").Schema;

const todo = new Schema(
  {
    todo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Todo = mongoose.model("Todo", todo);
