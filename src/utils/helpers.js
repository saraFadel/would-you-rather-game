
export function formatQuestion (question, author, authedUser) {
  const {id, optionOne, optionTwo} = question
  const {name, avatarURL} = author

  return {
    name,
    id,
    avatar: avatarURL,
    optionOne,
    optionTwo
  }
}
