const httpStatus = require('http-status');
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Question
 * @param {Object} questionBody
 * @returns {Promise<Question>}
 */
const createQuestion = async (questionBody) => {
  return Question.create(questionBody);
};

/**
 * Get Question by id
 * @param {ObjectId} id
 * @returns {Promise<Question>}
 */
const getQuestionById = async (id) => {
  return Question.findById(id);
};

/**
 * Update Question by id
 * @param {ObjectId} questionId
 * @param {Object} updateBody
 * @returns {Promise<Question>}
 */
const updateQuestionById = async (questionId, updateBody) => {
  const question = await getQuestionById(questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  Object.assign(question, updateBody);
  await question.save();
  return question;
};

/**
 * Delete Question by id
 * @param {ObjectId} questionId
 * @returns {Promise<Question>}
 */
const deleteQuestionById = async (questionId) => {
  const question = await getQuestionById(questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  await question.remove();
  return question;
};

/**
 * Query for Questions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuestions = async (filter, options) => {
  const exclude = { correctanswer: 0 };
  const questions = await Question.paginate(filter, options, exclude);
  return questions;
};

const getQuestionByListId = async (listId) => {
  const listQuestion = await Question.find({ question: { $in: listId } })
    .select('question')
    .select('correctanswer');
  return listQuestion;
};

const getAllQuestion = async () => {
  return Question.find();
};

module.exports = {
  deleteQuestionById,
  updateQuestionById,
  createQuestion,
  getQuestionById,
  queryQuestions,
  getQuestionByListId,
  getAllQuestion,
};
