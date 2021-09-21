import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function QuestionCard ({ question, users }) {
  return (
    <div className='card question'>
      <Link to={`/questions/${question.id}`} className='question__link'>
        <div className='question__head card__head'>
          {users[question.author].name} asks
        </div>
        <div className='question__body card__body'>
          <img className='question__image card__image' src={users[question.author].avatarURL} alt={`${users[question.author].name}'s avatar`} />
          <div className='question__text card__text'>
            <p className='wyr'>Would you rather...</p>
            <p>...{question.optionOne.text}...</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(QuestionCard)
