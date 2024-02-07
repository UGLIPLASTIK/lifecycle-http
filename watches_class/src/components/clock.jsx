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
    this.setState({
      time: "..."
    })
    this.getTime()
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTime = () => {
    this.setState({
      localTime: this.props.timeZone,
      name: this.props.name,
    })
    this.interval = setInterval(() => this.setState({
      time: moment().utc().add(this.state.localTime, 'hours').format('HH:mm:ss'),
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

export default Clock;