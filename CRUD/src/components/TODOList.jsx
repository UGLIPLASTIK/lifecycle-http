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
    if (method == 'GET') return fetch(url).then(response => {
      return response.json();
    })
    else return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
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

  addFunc = async () => {
    await this.sendRequest('POST', testUrl, {text: this.state.text})

    await this.sendRequest('GET', testUrl)
      .then(data => this.setState({
        posts: data,
        isLoaded: true,
      }))
  }

  deleteFunc = async (e) => {
    await fetch(`${testUrl}/${e.target.id}`, {
      method: 'delete',
    })
    
    await this.sendRequest('GET', testUrl)
      .then(data => this.setState({
        posts: data
      }))
      .catch(err => console.log(err))
  }

  updateFunc = () => {
    this.sendRequest('GET', testUrl)
      .then(data => this.setState({
        posts: data,
        isLoaded: true,
      }))
  }

  textareaOnCange = (e) => {
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
        <div>
          <div className="head-container">
            <h1>NOTES</h1>
            <button onClick={this.updateFunc} className="update-btn btn"></button>
          </div>

          <div className="users-container">
            {posts.map((post) => <TODO key={post.id} delOnClick={this.deleteFunc} post={post}/>)}
          </div>
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