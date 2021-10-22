import React, {Component} from 'react'
import {setAuthUser} from '../actions/authedUser'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    authedUser: '',
    toHome: false
  }

  handleChange = (e) => {
    const authedUser = e.target.value
    this.setState(() => ({
      authedUser
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {authedUser} = this.state
    const {dispatch} = this.props
    dispatch(setAuthUser(authedUser))

    this.setState(() => ({
      toHome: authedUser? true : false
    }))
  }

  render() {

    const {authedUser, toHome} = this.state
    if(toHome === true){
      return <Redirect to = '/' />
    }

    return(
      <form className = 'tab login' onSubmit = {this.handleSubmit}>
        <h2 className= 'center'>Login to Would You Rather Game</h2>
        <img
        src = 'images/question-mark.svg'
        alt = 'Question-mark'
        className = 'qMark'
        />
        <select className = 'question'
        value = {authedUser}
        onChange = {this.handleChange}>
          <option
          value = ''
          disabled>
            Login with your account
          </option>

          {Object.values(this.props.users).map((usr) => {
            return(
              <option key = {usr.id}
              value = {usr.id}>
                {usr.name}
              </option>)
          })}
        </select>
        <button
        className = 'btn qMark'
        type = 'submit'
        disabled = {authedUser === ''}>
          Login
        </button>
      </form>
    )
  }
}
export default connect()(Login)
