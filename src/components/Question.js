import { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

class Question extends Component {
  state = {
    answer: ''
  }

  handleChange = (e) => {
    this.setState({ answer: e.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const questionAnswer = this.makeQuestionAnswer()
    const { dispatch, history, location } = this.props
    dispatch(handleAnswerQuestion(questionAnswer)).then(() => history.replace(location.pathname))
  }

  makeQuestionAnswer = () => {
    const { authedUser, question } = this.props
    return {
      authedUser,
      qid: question.id,
      answer: this.state.answer
    }
  }

  isDisabled = () => this.state.answer.length === 0

  render () {
    const { question, questionId, users, authedUser } = this.props
    return question === undefined
      ? (
        <div>
          <p>This question is not found</p>
        </div>
        )
      : (
        <div className='card question'>
          <div className='question__head card__head'>
            {users[question.author].name} asks
          </div>
          <div className='question__body card__body'>
            <img className='question__image card__image' src={users[question.author].avatarURL} alt={`${users[question.author].name}'s avatar`} />
            <div className='question__text card__text'>
              <p className='wyr'>Would you rather...</p>
              {users[authedUser].answers[questionId] === undefined
                ? (
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <input type='radio' id='option-one' value='optionOne' name='answer' checked={this.state.answer === 'optionOne'} onChange={this.handleChange} />
                      <label htmlFor='option-one'>{question.optionOne.text}</label>
                    </div>
                    <div>
                      <input type='radio' id='option-two' value='optionTwo' name='answer' checked={this.state.answer === 'optionTwo'} onChange={this.handleChange} />
                      <label htmlFor='option-two'>{question.optionTwo.text}</label>
                    </div>
                    <button type='submit' disabled={this.isDisabled()} className='new-question__button'>Answer!</button>
                  </form>
                  )
                : (
                  <div>
                    <div className={`question__option ${question.optionOne.votes.indexOf(authedUser) > -1 ? 'selected-option' : ''}`}>{question.optionOne.text}</div>
                    <div className={`question__option ${question.optionTwo.votes.indexOf(authedUser) > -1 ? 'selected-option' : ''}`}>{question.optionTwo.text}</div>
                  </div>
                  )}
            </div>
          </div>
        </div>
        )
  }
}

function mapStateToProps ({ users, questions, authedUser }, props) {
  const { questionId } = props.match.params
  const question = questions[questionId]

  return {
    users,
    question,
    authedUser,
    questionId
  }
}

export default connect(mapStateToProps)(Question)
