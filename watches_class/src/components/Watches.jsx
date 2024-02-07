import React from "react";
import moment from "moment";
import Clock from "./clock";

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
    const newArr = this.state.clocksArr.concat({name: this.state.name, time: moment().format('HH:mm:ss')})
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
  
  test = (e) => {
    e.preventDefault()
    console.log(moment().utc().add(12, 'hours').format('HH:mm:ss'))
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
          <button onClick={this.test}>test</button>
        </form>     
        
        <div className="clock-container">{this.state.clocksArr.map(item => <Clock name = {item.name} timeZone = {this.state.timeZone} deleteClock = {this.deleteClock} key={this.state.clocksArr.indexOf(item)} time={item.time}/>)}</div>
      </>
    )
  }
}

export default Watches;