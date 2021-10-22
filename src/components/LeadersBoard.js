import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'

const countScore = (usr) => {
  return (
    usr.questions.length + Object.keys(usr.answers).length
  )
}

class LeadersBoard extends Component {

  render () {
    const {loggedUser, users, leaders} = this.props
    console.log(leaders)

    return (
      <ul >
        {leaders.map((leader) =>
          <li key = {users[leader].id} className = 'question'>
            <img
            src = {users[leader].avatarURL}
            alt = {`Avatar of ${users[leader].name}`}
            className = 'avatar'
            />
            <div>
              <h2 className = 'name'>{users[leader].name}</h2>
              <p>{`Answered Questions: ${Object.keys(users[leader].answers).length}`}</p>
              <div className = 'line'></div>
              <p>{`Created Questions: ${users[leader].questions.length}`}</p>
            </div>
            <div className = 'leadersBoard'>
              <button disabled
              className = 'btn score'>{countScore(users[leader])}</button>
            </div>
          </li>
          )}
      </ul>
    )
  }
}

function mapStateToProps ({authedUser, users}) {
  return {
    loggedUser: users[authedUser],
    leaders: Object.keys(users)
      .sort((a,b) => countScore(users[b]) - countScore(users[a])),
    users
  }
}

export default connect(mapStateToProps)(LeadersBoard)
