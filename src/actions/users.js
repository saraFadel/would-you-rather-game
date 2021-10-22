export const GET_USERS = 'GET_USERS'
export const ADD_QUESTION_TO_AUTHED_USER = 'ADD_QUESTION_TO_AUTHED_USER'
export const ADD_VOTE_TO_AUTHED_USER = 'ADD_VOTE_TO_AUTHED_USER'

export function getUsers (users) {
  return {
    type: GET_USERS,
    users
  }
}

export function addQuestionToUser(authedUser, id) {
  return {
    type: ADD_QUESTION_TO_AUTHED_USER,
    authedUser,
    id
  }
}

export function addVoteToUser(authedUser, qid, answer) {
  console.log(qid)
  return {
    type: ADD_VOTE_TO_AUTHED_USER,
    authedUser,
    qid,
    answer
  }
}
