import PropTypes from 'prop-types'

const User = ({ user, delOnClick }) => {
  const postKeys  = Object.keys(user);
  const postValues  = Object.values(user);
  return (
      <div className="user-card">
        
        <div className="user-keys">
          {postKeys.map((key, i) => <div key={i} className="user-item">{key}:</div>)}
        </div>

        <div className="user-keys">
          {postValues.map((value, i) => <div key={i} className="user-item">{value}</div>)}
        </div>
        <button onClick={delOnClick} className="btn delete-btn"></button>
      </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  delOnClick: PropTypes.func.isRequired,
}

export default User;