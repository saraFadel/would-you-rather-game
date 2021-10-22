import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'

class MyQuestions extends Component {
  
  render () {
    const {loggedUser} = this.props
    return (
      <ul>
        {loggedUser.questions.map((id) =>
          <li key = {id}>
            <Question id = {id}/>
          </li>
          )}
        </ul>
    )
  }
}

function mapStateToProps ({authedUser, users}) {
  return {
    loggedUser: users[authedUser],
  }
}

export default connect(mapStateToProps)(MyQuestions)
