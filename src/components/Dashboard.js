import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Question from './Question'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <Tabs  className = 'tab'>
          <TabList>
            <Tab>Answered Questions</Tab>
            <Tab>Unanswered Questions</Tab>
          </TabList>

          <TabPanel>
            <ul>
              {this.props.questionsIds.map((id) =>
                <li key = {id}>
                  {(this.props.authedUser.answers &&
                    Object.keys(this.props.authedUser.answers)
                      .filter((AnsId) => AnsId === id).length !== 0) &&
                    <Question id = {id}/>}
                  </li>
                )}
              </ul>
          </TabPanel>

          <TabPanel>
          <ul>
            {this.props.questionsIds.map((id) =>
              <li key = {id}>
                {(this.props.authedUser.answers &&
                  Object.keys(this.props.authedUser.answers)
                    .filter((AnsId) => AnsId === id).length === 0)
                  && <Question id = {id}/>}
                </li>
              )}
            </ul>
          </TabPanel>

        </Tabs>
      </div>
      )
    }
}

function mapStateToProps ({questions, authedUser, users}) {
  return {
    authedUser: users[authedUser],
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)
