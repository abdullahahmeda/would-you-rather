import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function answerQuestion (info) {
  return {
    type: ANSWER_QUESTION,
    info
  }
}

export function handleAddQuestion (question) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestion(question)
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
      .then(() => Promise.resolve())
  }
}

export function handleAnswerQuestion (info) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer(info)
      .then(() => dispatch(answerQuestion(info)))
      .then(() => dispatch(hideLoading()))
      .then(() => Promise.resolve())
  }
}
