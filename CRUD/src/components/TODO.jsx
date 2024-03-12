import PropTypes from 'prop-types'

const User = ({ post, delOnClick }) => {
  return (
      <div className="user-card">
        <div className="user-keys">
          {post.text}
        </div>
        <button onClick={delOnClick} id={post.id} className="btn delete-btn"></button>
      </div>
  )
}

User.propTypes = {
  post: PropTypes.object.isRequired,
  delOnClick: PropTypes.func.isRequired,
}

export default User;