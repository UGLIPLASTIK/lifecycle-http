import moment from 'moment';

const CifralWatch = () => {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const showTime = () => {
    const time = () => {
      return time;
    }
    let intervalId = setInterval(() => time, 1000)
  }
  return(
    <div>
      <div>{showTime()}</div>
    </div>
  )
}

export default CifralWatch;