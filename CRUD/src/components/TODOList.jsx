import React from "react";
import TODO from "./TODO";

const testUrl = 'http://localhost:7070/notes'

class TODOList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      error: null,
      isLoaded: false,
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
      if (response.ok) {
        return response.json();
      }
      return response.json().then(error => {
        const e = new Error("Что то не так: " + error);
        e.data = error;
        throw e
      })
    })
  }

  componentDidMount() {
    this.sendRequest('GET', testUrl)
      .then(data => this.setState({
        posts: data,
        isLoaded: true,
      }))
      .catch(error => this.setState({
        isLoaded: true,
        error
      }))
  }
  
  addFunc = (e) => {
    e.preventDefault();
    this.sendRequest('POST', testUrl, {text: this.state.text})
      .then(data => console.log(data))
      .catch(err => console.log(err));
    
    this.sendRequest('GET', testUrl)
    .then(data => this.setState({
      posts: data,
    }))
    .catch(err => console.log(err))
  }

  deleteFunc = (e) => {
    e.preventDefault();
    fetch(`${testUrl}/${e.target.id}`, {
      method: 'delete',
    })
    
    this.sendRequest('GET', testUrl)
      .then(data => this.setState({
        posts: data
      }))
      .catch(err => console.log(err))
  }

  textareaOnCange = (e) => {
    console.log(this.state.text)
    this.setState({
      text: e.target.value,
    })
  }

  render() {
    const { isLoaded, error, posts, text } = this.state;
    if (error) {
      return <div>ОШИБКА</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else return (
      <div className="main-container">
        <div className="user-container">
          {posts.map((post) => <TODO key={post.id} delOnClick={this.deleteFunc} post={post}/>)}
        </div>
        <form>
          <textarea value={text} onChange={this.textareaOnCange} name="" id="" cols="30" rows="10"></textarea>
          <button onClick={this.addFunc} className="btn add-btn"></button>
        </form>
      </div>
    )
  }
}

export default TODOList;