import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js'

export function getData () {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then(([users, questions]) => ({
    users,
    questions
  }))
}

export function saveQuestion (optionOne, optionTwo, author) {
  return _saveQuestion(optionOne, optionTwo, author)
}

export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}
