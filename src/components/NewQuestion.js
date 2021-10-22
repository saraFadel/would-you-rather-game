import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'
import {Redirect} from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }

  handleOptionOne = (e) => {
      const optionOne = e.target.value
      this.setState(() => ({
        optionOne
      }))
  }

  handleOptionTwo = (e) => {
      const optionTwo = e.target.value
      this.setState(() => ({
        optionTwo
      }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {optionOne, optionTwo} = this.state
    const {dispatch, id} = this.props
    console.log(id)
    dispatch(handleAddQuestion(optionOne, optionTwo))
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: id ? false : true
    }))
  }

  render () {
    const {optionOne, optionTwo, toHome} = this.state

    if(toHome === true) {
      return <Redirect to = '/' />
      }
    return (
      <div className = 'new'>
        <h2 className = 'center'>Create New Question</h2>
          <div className = 'question new'>
            <h4>Would you rather....</h4>
            <form className = 'formy'
            onSubmit = {this.handleSubmit}>
              <div className = 'option'>
                <input type = 'text' value = {optionOne}
                onChange = {this.handleOptionOne}
                 placeholder= 'Enter option one text here'/>
              </div>
              <div className = 'option'>
                <input type = 'text' value = {optionTwo}
                onChange = {this.handleOptionTwo}
                placeholder= 'Enter option one text here'/>
              </div>
              <button className = 'btn'
               type = 'submit'
               disabled = {optionOne === '' || optionTwo === ''}>
               Submit
               </button>
            </form>
          </div>
      </div>
    )
  }
}

export default connect()(NewQuestion)
