import React from "react";
import User from "./User";

const testUrl = 'https://jsonplaceholder.typicode.com/posts'
// const userUrl = "https://jsonplaceholder.typicode.com/users"

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      text: '',
    }
  }

  sendRequest = (url) => {
    return fetch(url).then(response => {
      return response.json()
    })
  }

  componentDidMount() {
    this.sendRequest(testUrl)
      .then(data => this.setState({
        posts: data
      }))
      .catch(err => console.log(err))
  }

  componentDidUpdate() {
    // this.sendRequest('GET', testUrl)
    //   .then(data => {
    //     this.setState({
    //       posts: data,
    //     })
    //   })
    //   .catch(err => console.log(err))
  }

  addFunc = (e) => {
    e.preventDefault();
    this.sendRequest('POST', testUrl, {text: this.state.text})
      .then(data => console.log(JSON.stringify(data)))
      .catch(err => console.log(err))
  }

  deleteFunc = () => {

  }

  textareaOnCange = (e) => {
    const { target } = e;
    this.setState({
      text: target.value,
    })
  }

  render() {
    return (
      <div className="main-container">
        <div className="user-container">
          {this.state.posts.map((post, i) => <User key={i} delOnClick={this.deleteFunc} user={post}/>)}
        </div>
        <form>
          <textarea value={this.state.text} onChange={this.textareaOnCange} name="" id="" cols="30" rows="10"></textarea>
          <button onClick={this.addFunc} className="btn add-btn"></button>
        </form>
      </div>

    )
  }
}

export default UserList;