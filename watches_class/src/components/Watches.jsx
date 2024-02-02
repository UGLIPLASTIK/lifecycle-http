import React from "react";
import moment from "moment";

class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.interval = undefined;
    this.state = {
      localTime: undefined,
      time: undefined,
    }
  }

  componentDidMount() {
    this.getTime()
  }

  getTime = () => {
    this.setState({
      localTime: this.props.timeZone,
      time: moment().format('h:mm:ss'),
    })
    this.interval = setInterval(() => this.setState({
      time: moment().add(this.state.localTime, 'hours').format('h:mm:ss'),
    }), 1000)
  }

  // infoBtn = () => {
  //   console.log(this.state)
  // }

  render() {
    return (
      <>
        <div>{this.state.time}</div>
        {/* <button onClick={this.infoBtn}>Info</button> */}
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

  inputOnChange = (e) => {
    this.setState({
      timeZone: e.target.value,
    })
  }

  addTimeButton = () => {
    const newArr = this.state.clocksArr.concat(moment().format('h:mm:ss'))
    this.setState({
      clocksArr: newArr,
    })
  }

  render() {
    return (
      <>
        <div>Время</div>
        <input type="text"
                onChange={this.inputOnChange}/>
        <button onClick={this.addTimeButton}>Добавить</button>
        <div>{this.state.clocksArr.map(item => <Clock timeZone = {this.state.timeZone} key={this.state.clocksArr.indexOf(item)} time={item}/>)}</div>
      </>
    )
  }
}

export default Watches;