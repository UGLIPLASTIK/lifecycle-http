import React from "react";
import moment from "moment";

class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.interval = undefined;
    this.state = {
      localTime: undefined,
      time: undefined,
      name: undefined,
    }
  }

  componentDidMount() {
    this.getTime()
  }

  componentWillUnmount() {
    this.interval = clearInterval(this.interval);
  }

  getTime = () => {
    this.setState({
      localTime: this.props.timeZone,
      time: moment().format('h:mm:ss'),
      name: this.props.name,
    })
    this.interval = setInterval(() => this.setState({
      time: moment().add(this.state.localTime, 'hours').format('h:mm:ss'),
    }), 1000)
  }

  render() {
    return (
      <>
        <div className="watch">
          <button onClick={this.props.deleteClock} className="delete-btn"></button>
          <div className="name">{this.state.name}</div>
          <div>{this.state.time}</div>
        </div>
      </>
    )
  }
}


class Watches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeZone: undefined,
      clocksArr: [],
    }
    this.interval = undefined;
  }

  inputTimeOnChange = (e) => {
    this.setState({
      timeZone: e.target.value,
    })
  }

  inputNameOnChange = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  addTimeButton = (e) => {
    e.preventDefault()
    const newArr = this.state.clocksArr.concat({name: this.state.name, time: moment().format('h:mm:ss')})
    this.setState({
      clocksArr: newArr,
      name: "",
    })
  }

  deleteClock = (e) => {
    const findItem = e.target.closest('div');
    const findName = findItem.querySelector('.name').textContent;
    const newArr = this.state.clocksArr.filter((e) => {
      return e.name != findName;
    })
    this.setState({
      clocksArr: newArr,
    })
  }

  render() {
    return (
      <>
        <form className="data-field">
          <div className="input-box">
            <label className="input-group-label" htmlFor="name">Название</label>
            <input type="text"
                   id="name"
                  //  value={this.state.name}
                   onChange={this.inputNameOnChange}/>
          </div>
          <div className="input-box">
            <label className="input-group-label" htmlFor="time">Время</label>
            <input type="number"
                  //  value={this.state.timeZone}
                   id="time"
                   onChange={this.inputTimeOnChange}/>
          </div>
          <button onClick={this.addTimeButton}>Добавить</button>
        </form>     
        
        <div className="clock-container">{this.state.clocksArr.map(item => <Clock name = {item.name} timeZone = {this.state.timeZone} deleteClock = {this.deleteClock} key={this.state.clocksArr.indexOf(item)} time={item.time}/>)}</div>
      </>
    )
  }
}

export default Watches;