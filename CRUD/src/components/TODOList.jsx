import React from "react";
import TODO from "./TODO";

const testUrl = 'http://localhost:3000/TODOS'

class TODOList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      text: '',
    }
  }

  sendRequest = (method, url, body = null) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (method == 'GET') return fetch(url).then(response => {
      return response.json();
    })
    else return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
    }).then(response => {
      return response.json();
    })
  }

  componentDidMount() {
    this.sendRequest('GET', testUrl)
      .then(data => this.setState({
        posts: data
      }))
      .catch(err => console.log(err))
  }

  addFunc = (e) => {
    e.preventDefault();
    this.sendRequest('POST', testUrl, {text: this.state.text})
      .then(data => console.log(data))
      .catch(err => console.log(err));
    
    this.sendRequest('GET', testUrl)
    .then(data => this.setState({
      posts: data
    }))
    .catch(err => console.log(err))
  }

  deleteFunc = (e) => {
    e.preventDefault();
    this.sendRequest('DELETE', `${testUrl}/${e.target.id}`);

    this.sendRequest('GET', testUrl)
    .then(data => this.setState({
      posts: data
    }))
    .catch(err => console.log(err))
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
          {this.state.posts.map((post, i) => <TODO key={i} delOnClick={this.deleteFunc} post={post}/>)}
        </div>
        <form>
          <textarea value={this.state.text} onChange={this.textareaOnCange} name="" id="" cols="30" rows="10"></textarea>
          <button onClick={this.addFunc} className="btn add-btn"></button>
        </form>
      </div>

    )
  }
}

export default TODOList;