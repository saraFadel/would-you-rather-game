import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion} from '../utils/helpers'
import {withRouter} from 'react-router-dom'

class Question extends Component {

  redirectToquestion = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`)
  }

  render () {
    const {question} = this.props

    if(question === null){
      return <h1>This Question Isn't Found</h1>
    }

    const {authedUser} = this.props
    const {name, id, avatar, optionOne, optionTwo} = question

    return (
      <div className = 'question'>
        <img
        src = {avatar}
        alt = {`Avatar of ${name}`}
        className = 'avatar'
        />
        <div>
          <h4>{name} asks would you rather</h4>
            <div className= 'option'>
              <label>{optionOne.text}</label>
            </div>
            <div className = 'line'></div>
            <div className= 'option'>
              <label>{optionTwo.text}</label>
            </div>
            {
              optionOne.votes && optionTwo.votes
            ? ((optionOne.votes
              .filter((voter) => voter === authedUser).length !== 0) || (optionTwo.votes
                .filter((voter) => voter === authedUser).length !== 0))
              ? <button className = 'btn' onClick = {(e) => this.redirectToquestion(e, id)}>View Poll</button>
              : <button className = 'btn'onClick = {(e) => this.redirectToquestion(e, id)}>Vote</button>
            : <button className = 'btn' onClick = {(e) => this.redirectToquestion(e, id)}>View Poll</button>}

        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, {id}) {
  const question = questions[id]
  let vote = false;
  if(question === undefined){
    return{
      question: null
    }
  }else{
    if(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)){
      vote = true
    }
  }
  const user = users[question.author]
  return {
    vote,
    authedUser,
    user,
    question: formatQuestion(question, user, authedUser)
  }
}
export default withRouter(connect(mapStateToProps)(Question))
