const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestion = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    answer1: Joi.string().required(),
    answer2: Joi.string().required(),
    answer3: Joi.string().required(),
    answer4: Joi.string().required(),
    correctanswer: Joi.string().required(),
  }),
};

const submitAnswer = {
  body: Joi.array().items(
    Joi.object().keys({
      question: Joi.string().required(),
      correctanswer: Joi.string().required(),
    })
  ),
};

const getQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

const updateQuestion = {
  params: Joi.object().keys({
    questionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      question: Joi.string().required(),
      answer1: Joi.string().required(),
      answer2: Joi.string().required(),
      answer3: Joi.string().required(),
      answer4: Joi.string().required(),
      correctanswer: Joi.string().required(),
    })
    .min(1),
};

const deleteQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  submitAnswer,
};
