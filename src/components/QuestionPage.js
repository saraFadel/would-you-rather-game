import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSaveAnswer} from '../actions/questions'
import {Redirect} from 'react-router-dom'

class QuestionPage extends Component {
  state = {
    choice: '',
    toHome: false
  }

  handleChoice = (e) => {
    const choice = e.target.value
    console.log(choice)
    this.setState(() => ({
      choice
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {choice} = this.state
    const {dispatch, id} = this.props
    dispatch(handleSaveAnswer(id, choice))
    this.setState(() => ({
      choice: '',
      toHome: choice ? true : false
    }))
  }

  render(){

    const {question} = this.props
    if(question === null){
      return <h1>This Question Isn't Found</h1>
    }

    const {choice, toHome} = this.state
    if(toHome === true) {
      return <Redirect to = '/' />
      }

    const {authedUser, user} = this.props
    const {optionOne, optionTwo} = question
    const {name, avatarURL} = user
    console.log(avatarURL)

    return (
      <div className = 'question'>
        <img
        src = {avatarURL}
        alt = {`${name}'s avatar`}
        className = 'avatar'
        />
        <div>
          <h4>{name} asks would you rather</h4>
          {
            (optionOne.votes && optionTwo.votes) &&
            ((optionOne.votes
            .filter((voter) => voter === authedUser).length !== 0) || (optionTwo.votes
              .filter((voter) => voter === authedUser).length !== 0))
            ? <div>
                <div className= 'option'>
                  <p>{optionOne.text}</p>
                  <label className = 'btn'>{`${optionOne.votes.length} out of ${optionOne.votes.length + optionTwo.votes.length} votes`}</label>
                  {optionOne.votes
                  .filter((voter) => voter === authedUser)
                  .length !== 0 &&
                  <img src = 'images/thumbs.png'
                  alt = 'Your Vote'/>}
                </div>
                <div className = 'line'></div>
                <div className= 'option'>
                  <p>{optionTwo.text}</p>
                  <label className = 'btn' disabled>{`${optionTwo.votes.length} out of ${optionOne.votes.length + optionTwo.votes.length} votes`}</label>
                  {optionTwo.votes
                  .filter((voter) => voter === authedUser)
                  .length !== 0 &&
                  <img src = 'images/thumbs.png'
                  alt = 'Your Vote'/>}
                </div>
              </div>
            : <form className = 'formy'
              onSubmit = {this.handleSubmit}>
                <div className = 'option'>
                  <input type = 'radio'
                  name= 'Voting' value = 'optionOne'
                  onClick = {this.handleChoice}/>
                  <label>{optionOne.text}</label>

                </div>
                <div className = 'option'>
                  <input type = 'radio'
                  name= 'Voting' value = 'optionTwo'
                  onClick = {this.handleChoice}/>
                  <label>{optionTwo.text}</label>
                </div>

                <button className = 'btn'
                 type = 'submit'
                 disabled = {choice? false : true}>
                 Vote
                 </button>
              </form>
            }
        </div>
      </div>
    )

  }
}

function mapStateToProps ({authedUser, questions, users}, props) {
  const {id} = props.match.params
  const user = users[questions[id].author]
  return{
    id,
    authedUser,
    user,
    question: questions[id]
  }
}

export default connect(mapStateToProps)(QuestionPage)
