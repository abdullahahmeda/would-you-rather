import { ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'
import { RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users
    case ADD_QUESTION: {
      const questions = state[action.question.author].questions.concat(action.question)
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions
        }
      }
    }
    case ANSWER_QUESTION: {
      const answers = Object.assign({}, state[action.info.authedUser].answers, { [action.info.qid]: action.info.answer })
      return {
        ...state,
        [action.info.authedUser]: {
          ...state[action.info.authedUser],
          answers
        }
      }
    }
    default:
      return state
  }
}
