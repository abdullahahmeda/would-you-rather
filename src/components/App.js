import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Navbar'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import LoadingBar from 'react-redux-loading-bar'
import Question from './Question'
import Login from './Login'
import Dashboard from './Dashboard'
import Logout from './Logout'

class App extends Component {
  render () {
    return (
      <Router>
        <LoadingBar />
        <Navbar />
        {this.props.authedUser
          ? (
            <div className='container'>
              <Route exact path='/' component={Dashboard} />
              <Route path='/add' component={NewQuestion} />
              <Route path='/leaderboard' component={Leaderboard} />
              <Route path='/questions/:questionId' component={Question} />
              <Route path='/logout' component={Logout} />
            </div>
            )
          : <Login />}
      </Router>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    loading: Object.keys(users).length === 0,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
