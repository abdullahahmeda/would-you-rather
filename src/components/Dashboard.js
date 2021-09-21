import { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'

class Dashboard extends Component {
  state = {
    answeredQuestions: [],
    unAnsweredQuestions: [],
    activeQuestions: 'unanswered'
  }

  componentDidMount () {
    const { authedUser, users, questions } = this.props
    const answeredQuestionsIds = Object.keys(users[authedUser].answers)
    const answeredQuestions = answeredQuestionsIds.map(questionId => questions[questionId])
    answeredQuestions.sort((a, b) => b.timestamp - a.timestamp)
    const unAnswredQuestionsIds = Object.keys(questions).filter(questionId => answeredQuestionsIds.findIndex(qId => qId === questionId) === -1)
    const unAnsweredQuestions = unAnswredQuestionsIds.map(questionId => questions[questionId])
    unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp)
    
    this.setState({
      unAnsweredQuestions,
      answeredQuestions,
      activeQuestions: 'unanswered'
    })
  }

  showUnAnswred = () => {
    this.setState(prevState => ({
      activeQuestions: 'unanswered'
    }))
  }

  showAnswred = () => {
    this.setState(prevState => ({
      activeQuestions: 'answered'
    }))
  }

  render () {
    return (
      <div className='tab'>
        <div className='tab__head'>
          <button onClick={this.showUnAnswred} className={this.state.activeQuestions === 'unanswered' ? 'active-tab' : undefined}>Unanswered questions</button>
          <button onClick={this.showAnswred} className={this.state.activeQuestions === 'answered' ? 'active-tab' : undefined}>Answered questions</button>
        </div>
        <div className='tab__body'>
          {this.state.activeQuestions === 'unanswered' 
          ? this.state.unAnsweredQuestions.map(question => <QuestionCard key={question.id} question={question} />)
          : this.state.answeredQuestions.map(question => <QuestionCard key={question.id} question={question} />)}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(Dashboard)
