import { useEffect, useState } from 'react';
import './styles/App.scss';

function App() {
  const [time, setTime] = useState({
    days: '45',
    hours: '12',
    minutes: '10',
    seconds: '06'
  })

  const formatNumber = num => num < 10 ? `0${num}` : num

  function declensionWords() {
    return 'Days'
  }

  useEffect(() => {
    function changeTime() {
      const time = new Date()
      const year = time.getFullYear()
      
      const start = new Date(year + 1, 0, 0);
      const diff = start - time

      const day = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = 23 - time.getHours()
      const minutes = 59 - time.getMinutes()
      const seconds = 59 - time.getSeconds()

      setTime({
        days: formatNumber(day),
        hours: formatNumber(hours),
        minutes: formatNumber(minutes),
        seconds: formatNumber(seconds)
      })
    }
    changeTime()

    const timer = setInterval(changeTime, 1000)

    return () => clearInterval(timer);
  }, [])
  
  return (
    <div className="timer__wrapper">
      <h1>Countdown to my birthday:</h1>
      <div className="timer__time-left">
        <div className="timer__time-left__days">
          <span>
            {time.days}
          </span>
          <p>
            {declensionWords()}
          </p>
        </div>
        <div className="timer__time-left__days">
          <span>
            {time.hours}
          </span>
          <p>
            Hours
          </p>
        </div>
        <div className="timer__time-left__days">
          <span>
            {time.minutes}
          </span>
          <p>
            Minutes
          </p>
        </div>
        <div className="timer__time-left__days">
          <span>
            {time.seconds}
          </span>
          <p>
            Second
          </p>
        </div>
      </div>
      <div className="timer__end">

      </div>
    </div>
  );
}
export default App;