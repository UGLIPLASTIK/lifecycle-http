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

  sendRequest = (method, url, body = null) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = 'json';
      if (method == 'POST') xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.status >= 400) {
         reject(xhr.response)
        } else {
          resolve(xhr.response)
        }
      }
      xhr.onerror = () => {
        reject(xhr.response);
      }
      if (method == 'POST') xhr.send(JSON.stringify(body))
      xhr.send(body)
    })
  }

  componentDidMount() {
    this.sendRequest('GET', testUrl)
      .then(data => {
        this.setState({
          posts: data,
        })
      })
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