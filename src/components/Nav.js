import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {setAuthUser} from '../actions/authedUser'
import {connect} from 'react-redux'

class Nav extends Component{

  logOut = (e) => {
    const {dispatch} = this.props
    dispatch(setAuthUser(''))
  }


  render() {
    const {authedUser, users} = this.props

    return (
        authedUser &&
           <nav className = 'Nav'>
              <ul>
                <li>
                  <NavLink to= '/' exact  className = 'activ'>
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink to= '/new' exact  className = 'activ'>
                    New Question
                  </NavLink>
                </li>

                <li>
                  <NavLink to= '/questions' exact  className = 'activ'>
                    My Questions
                  </NavLink>
                </li>

                <li>
                  <NavLink to= '/leadersBoard' exact  className = 'activ'>
                    Leaders Board
                  </NavLink>
                </li>

                <li>
                  <NavLink  to = '' exact
                  style = {{textDecoration: 'none', color: '#495D63',
                   fontWeight: 'normal'}}>
                    <img src = {users[authedUser].avatarURL}
                    altr = 'logged user image'
                    className = 'loggedUserAvatar'/>
                    <p>{users[authedUser].name}</p>
                  </NavLink>
                </li>

                <li style = {{paddingLeft: '-20'}}>
                  <NavLink to= '/login' exact
                  className = 'activ'>

                      <img src = 'images/logout.png'
                      altr = 'logout'
                      className = 'loggedUserAvatar'
                      onClick = {this.logOut}/>
                  </NavLink>
                </li>
              </ul>
            </nav>
    )
  }
}
export default connect()(Nav)
