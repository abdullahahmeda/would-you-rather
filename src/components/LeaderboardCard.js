function LeaderboardCard ({ user }) {
  return (
    <div className='card'>
      <div className='card__body'>
        <img src={user.avatarURL} alt={`${user.name}'s avatar`} className='card__image' />
        <div className='card__text'>
          <h3>{user.name}</h3>
          <p>{Object.keys(user.answers).length} Answered questions</p>
          <p>{Object.keys(user.questions).length} Asked questions</p>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardCard
