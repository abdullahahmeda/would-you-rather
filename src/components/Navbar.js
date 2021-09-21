import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'

class Navbar extends Component {
  render () {
    const { authedUser, users } = this.props
    return (
      <div>
        <div className='logo'>Would You Rather</div>
        {authedUser && (
          <div className='navbar__links'>
            <NavLink to='/' className='navbar__link' exact activeClassName='active'>Home</NavLink>
            <NavLink to='/add' className='navbar__link' activeClassName='active'>New Question</NavLink>
            <NavLink to='/leaderboard' className='navbar__link' activeClassName='active'>Leaderboard</NavLink>
            <span>Hello, {users[authedUser].name} <Link to='/logout'>Logout</Link></span>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }, props) {
  return {
    ...props,
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Navbar)
