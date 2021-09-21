import { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class Login extends Component {
  handleChange = (e) => {
    const { dispatch } = this.props
    dispatch(handleInitialData(e.target.value))
  }

  render () {
    return (
      <div>
        <p>Welcome to "Would you rather" game. Please login to continue</p>
        <span>Login as: </span>
        <select onChange={this.handleChange}>
          <option>Please select...</option>
          <option value='sarahedo'>Sarah Edo</option>
          <option value='tylermcginnis'>Tyler McGinnis</option>
          <option value='johndoe'>John Doe</option>
        </select>
      </div>
    )
  }
}

export default connect()(Login)
