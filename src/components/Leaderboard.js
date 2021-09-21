import { connect } from 'react-redux'
import LeaderboardCard from './LeaderboardCard'

function Leaderboard ({ users }) {
  const sortedUsers = Object.values(users)
  sortedUsers.sort((user1, user2) => (Object.keys(user2.answers).length + Object.keys(user2.questions).length) - (Object.keys(user1.answers).length + Object.keys(user1.questions).length))

  return (
    <div>
      {sortedUsers.map(user => <LeaderboardCard key={user.id} user={user} />)}
    </div>
  )
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
