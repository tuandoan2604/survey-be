const express = require('express');
const validate = require('../../middlewares/validate');
const questionController = require('../../controllers/question.controller');
const auth = require('../../middlewares/auth');
const questionValidation = require('../../validations/question.validation');

const router = express.Router();

router.get('/', auth('getQuestions'), questionController.listQuestionsId);
router.post('/submit', auth('getQuestions'), validate(questionValidation.submitAnswer), questionController.submitAnswer);
router.get('/edit', auth('getListQuestions'), questionController.listQuestionsId);
router.post(
  '/edit',
  auth('manageQuestions'),
  validate(questionValidation.createQuestion),
  questionController.createQuestion
);
router.patch(
  '/edit/:questionId',
  auth('manageQuestions'),
  validate(questionValidation.updateQuestion),
  questionController.updateQuestion
);
router.delete(
  '/edit/:questionId',
  auth('manageQuestions'),
  validate(questionValidation.deleteQuestion),
  questionController.deleteQuestion
);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions API
 */

/**
 * @swagger
 * /questions/:
 *   get:
 *     summary: User Get Question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Questions'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /questions/submit:
 *   post:
 *     summary: User Submit Questions
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score: number
 *               example:
 *                 score: number
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid email or password
 */

/**
 * @swagger
 * /questions/edit:
 *   get:
 *     summary: Admin Get Questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Questions'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /questions/edit:
 *   post:
 *     summary: Create Questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer1
 *               - answer2
 *               - answer3
 *               - answer4
 *               - correctanswer
 *             properties:
 *               question:
 *                 type: string
 *               answer1:
 *                 type: string
 *               answer2:
 *                 type: string
 *               answer3:
 *                 type: string
 *               answer4:
 *                 type: string
 *               correctanswer:
 *                 type:string
 *             example:
 *              question: 1+2+3=?
 *              answer1: 5
 *              answer2: 6
 *              answer3: 7
 *              answer4: 8
 *              correctanswer: 6
 *     responses:
 *       "201":
 *         description: Create
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Questions'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /questions/edit/{questionId}:
 *   patch:
 *     summary: Update Question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer1
 *               - answer2
 *               - answer3
 *               - answer4
 *               - correctanswer
 *             properties:
 *               question:
 *                 type: string
 *               answer1:
 *                 type: string
 *               answer2:
 *                 type: string
 *               answer3:
 *                 type: string
 *               answer4:
 *                 type: string
 *               correctanswer:
 *                 type:string
 *             example:
 *               question: 1+2+3=?
 *               answer1: 5
 *               answer2: 6
 *               answer3: 7
 *               answer4: 8
 *               correctanswer: 6
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /questions/delete/{questionId}:
 *   delete:
 *     summary: Delete Questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: question
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
