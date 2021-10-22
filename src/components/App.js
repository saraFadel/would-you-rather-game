import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import {handleData} from '../actions/shared'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import Login from './Login'
import MyQuestions from './MyQuestions'
import LeadersBoard from './LeadersBoard'
import Nav from './Nav'
import QuestionPage from './QuestionPage'

class App extends Component{
  componentDidMount () {
    this.props.dispatch(handleData())
  }
  render(){
    return(
      <Router>
           <Fragment>
             <LoadingBar />
             <div>
               {this.props.loading === true
               ? <Login users = {this.props.users}/>
               : <div>
                   <Nav users = {this.props.users} authedUser = {this.props.authedUser}/>

                  <Route path = '/login' exact render = {() => (
                     <Login users = {this.props.users}/> )}/>

                   <Route path = '/questions' exact render = {() => (
                     <MyQuestions users = {this.props.users}/> )}/>

                   <Route path = '/' exact component = {Dashboard}/>

                   <Route path = '/leadersBoard' exact component = {LeadersBoard}/>

                   <Route path = '/new' exact component = {NewQuestion}/>
                   <Route path = '/questions/:id' exact component = {QuestionPage}/>
                 </div>}
             </div>
           </Fragment>
         </Router>
    )
  }
}

function mapStateToProps ({authedUser, users}) {
  return {
    loading: authedUser === null,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
