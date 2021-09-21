import { ADD_QUESTION, RECEIVE_QUESTIONS, ANSWER_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.questions
    case ADD_QUESTION: {
      const { question } = action
      return {
        ...state,
        [question.id]: question
      }
    }
    case ANSWER_QUESTION: {
      const votes = state[action.info.qid][action.info.answer].votes.concat(action.info.authedUser)
      return {
        ...state,
        [action.info.qid]: {
          ...state[action.info.qid],
          [action.info.answer]: {
            ...state[action.info.qid][action.info.answer],
            votes
          }
        }
      }
    }
    default:
      return state
  }
}
