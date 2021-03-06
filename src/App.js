import { useEffect, useState } from 'react';

import Cake from './cake.svg';
import './styles/App.scss';

export default function App() {
  const [birthdayDate, setBirthdayDate] = useState('')
  const [time, setTime] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const formatNumber = num => num < 10 ? `0${num}` : num
  const declensionWords = (time, value) => Number(value) === 1 ? time : `${time}s`

  const placeholderDate = `${formatNumber(new Date().getDate())}-${formatNumber(new Date().getMonth() + 1)}`

  useEffect(() => {
    function changeTime() {
      const time = new Date()
      const year = time.getFullYear()
      const userBirthday = birthdayDate.split('-').map(el => Number(el))
      
      if(userBirthday.length === 2 && userBirthday[0] <= 31 && userBirthday[0] > 0 && userBirthday[1] <= 12 && userBirthday[1] > 0) {
        const start = new Date(year+1, userBirthday[1] - 1, userBirthday[0]);
        const diff = start - time

        const day = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = 23 - time.getHours()
        const minutes = 59 - time.getMinutes()
        const seconds = 59 - time.getSeconds()

        setTime({
          days: formatNumber(day >= 365 ? Math.abs(365 - day) : day),
          hours: formatNumber(hours),
          minutes: formatNumber(minutes),
          seconds: formatNumber(seconds)
        })
      }
    }
    changeTime()

    const timer = setInterval(changeTime, 1000)

    return () => clearInterval(timer);
  }, [birthdayDate])
  
  return (
    <div className="timer__wrapper">
      <div className="cake__img">
        <img src={Cake} alt="" />
      </div>
      <h1>Countdown to your birthday:</h1>
      <div className="timer__input">
        <p>Input your birthday in day-month format:</p>
        <input
          type="text"
          placeholder={placeholderDate}
          value={birthdayDate}
          onChange={e => setBirthdayDate(e.target.value.replace(/^-|[^\d-]|-{2}$|\d{3}/, ''))}
        />
      </div>
      <div className="timer__time-left">
        <div className="timer__time-left__days">
          <span>
            {time.days}
          </span>
          <p>
            {declensionWords('day', time.days)}
          </p>
        </div>
        <div className="timer__time-left__days">
          <span>
            {time.hours}
          </span>
          <p>
            {declensionWords('hour', time.hours)}
          </p>
        </div>
        <div className="timer__time-left__days">
          <span>
            {time.minutes}
          </span>
          <p>
            {declensionWords('minute', time.minutes)}
          </p>
        </div>
        <div className="timer__time-left__days">
          <span>
            {time.seconds}
          </span>
          <p>
            {declensionWords('second', time.seconds)}
          </p>
        </div>
      </div>
    </div>
  );
}