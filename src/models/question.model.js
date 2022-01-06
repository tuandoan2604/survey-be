const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;
const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
    // unique: true
  },
  answer1: {
    type: String,
    require: true,
  },
  answer2: {
    type: String,
    require: true,
  },
  answer3: {
    type: String,
    require: true,
  },
  answer4: {
    type: String,
    require: true,
  },
  correctanswer: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

QuestionSchema.plugin(toJSON);
QuestionSchema.plugin(paginate);

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
