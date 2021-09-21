import { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { dispatch, history } = this.props
    const question = this.makeQuestion(this.state)
    dispatch(handleAddQuestion(question)).then(() => history.push('/'))
  }

  makeQuestion = (options) => {
    return {
      author: this.props.authedUser,
      ...options
    }
  }

  setoptionOneText = (val) => {
    this.setState({ optionOneText: val })
  }

  setoptionTwoText = (val) => {
    this.setState({ optionTwoText: val })
  }

  isDisabled = () => this.state.optionOneText === '' || this.state.optionTwoText === ''

  render () {
    return (
      <div className='new-question'>
        <div className='new-question__head'>
          <h2 className='text-center'>Create New Question</h2>
        </div>
        <form className='new-question__body' onSubmit={this.handleSubmit}>
          <p className='wyr'>Would you rather...</p>
          <input type='text' className='form-control' value={this.state.optionOneText} onChange={e => this.setoptionOneText(e.target.value)} />
          <span className='new-question__or'>OR</span>
          <input type='text' className='form-control' value={this.state.optionTwoText} onChange={e => this.setoptionTwoText(e.target.value)} />
          <button className='new-question__button' disabled={this.isDisabled()}>Create</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
