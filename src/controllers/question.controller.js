const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');
const pick = require('../utils/pick');

// const submitAnswer = async (req, res) => {
//   try {
//     const question = Object.keys(req.body);
//     const getQuestion = await Question.find().select('_id').select('correctanswer');
//
//     const result = getQuestion.reduce(function (resultForEachId, item, index) {
//       const questionID = item._id;
//       const responseID = question[index];
//       if (responseID === questionID && req.body[responseID] === item.correctanswer) {
//         resultForEachId.push({ id: questionID, result: true });
//       } else resultForEachId.push({ id: questionID, result: false });
//       return resultForEachId;
//     }, []);
//     res.json(result);
//   } catch (error) {
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
//   }
// };

const submitAnswer = catchAsync(async (req, res) => {
  const listQues = req.body.map((element) => element.question);
  const listQuestions = await questionService.getQuestionByListId(listQues);
  const results = listQuestions.map((e) => {
    let elementResult;
    req.body.forEach((questionElement, index, arr) => {
      if (questionElement.question === e.question) {
        if (questionElement.correctanswer === e.correctanswer) elementResult = { result: true, ...arr[index] };
        else elementResult = { result: false, ...arr[index] };
      }
    });
    return elementResult;
  });
  res.json(results);
});

const listQuestionsId = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['_id', 'question', 'answer1', 'answer2', 'answer3', 'answer4']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await questionService.queryQuestions(filter, options);
  res.send(result);
});

const getAllQuestion = catchAsync(async (req, res) => {
  const result = await questionService.getAllQuestion();
  res.send(result);
});

const updateQuestion = catchAsync(async (req, res) => {
  const question = await questionService.updateQuestionById(req.params.questionId, req.body);
  res.send(question);
});

const createQuestion = catchAsync(async (req, res) => {
  const question = await questionService.createQuestion(req.body);
  res.send(question);
});

const deleteQuestion = catchAsync(async (req, res) => {
  const question = await questionService.deleteQuestionById(req.params.questionId);
  res.send(question);
});

module.exports = {
  submitAnswer,
  listQuestionsId,
  updateQuestion,
  createQuestion,
  deleteQuestion,
  getAllQuestion,
};
