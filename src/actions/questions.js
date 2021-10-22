import {saveQuestion, saveQuestionAnswer} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'
import {
  addQuestionToUser,
  addVoteToUser
} from './users'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    questions
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function saveAnswer (authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveAnswer (qid, answer) {
  return(dispatch, getState) => {
    const {authedUser, users} = getState()

    dispatch (showLoading())

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
     })
    .then(() => {
      dispatch(saveAnswer(authedUser, qid, answer))
      dispatch(addVoteToUser(authedUser, qid, answer))
    })
    .then(() => dispatch(hideLoading()))
  }
}

export function handleAddQuestion (optionOne, optionTwo) {
  return(dispatch, getState) => {
    const {authedUser, users} = getState()

    dispatch (showLoading())

    return saveQuestion({
      optionOne,
      optionTwo,
      author: authedUser
    })
    .then((question) => {
      dispatch(addQuestion(question))
      dispatch(addQuestionToUser(authedUser, question.id))
    })
    .then(() => dispatch(hideLoading()))
  }
}
