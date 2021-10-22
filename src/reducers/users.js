import {
  GET_USERS,
  ADD_QUESTION_TO_AUTHED_USER,
  ADD_VOTE_TO_AUTHED_USER
} from '../actions/users'


export default function users (state= {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
      }
    case  ADD_QUESTION_TO_AUTHED_USER:
      const {authedUser, id} = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([id])
        }
      }
    case ADD_VOTE_TO_AUTHED_USER:
      const {qid, answer} = action

      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [qid]: answer
          }
        }
      }

    default:
      return state
  }
}
