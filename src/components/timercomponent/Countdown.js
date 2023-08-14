import React, { useState, useEffect } from 'react';
import Button from '../button/Button';

export default function Countdown() {
  const [time, setTime] = useState({ hours: 0, minutes: 10, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [inputsEnabled, setInputsEnabled] = useState(true);
  

  useEffect(() => {
    let intervalId = null;

    if (isActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;

          if (hours === 0 && minutes === 0 && seconds === 0) {
            setIsActive(false);
            setInputsEnabled(true);
            clearInterval(intervalId);
            return { hours: 0, minutes: 0, seconds: 0 };
          }

          let newSeconds = seconds - 1;
          let newMinutes = minutes;
          let newHours = hours;

          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }

          if (newMinutes < 0) {
            newMinutes = 59;
            newHours -= 1;
          }

          return {
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds,
          };
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive]);


  const handleTimeChange = (event, name) => {
    const value = event.target.value;
    const key = event.key;

    if (key === 'Backspace') {
      setTime({ ...time, [name]: '' });
      return;
    }
    
    const MAX_VALUES = {
      hours: 23,
      minutes: 59,
      seconds: 59
    };

    const MIN_VALUES = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) 
    return;
    
    const maxValue = MAX_VALUES[name];
    const minValue = MIN_VALUES[name];
    if (parsedValue > maxValue || parsedValue < minValue) 
    return;
    
    setTime((prevTime) => ({
      ...prevTime,
      [name]: parsedValue
    }));
  };

  const handleClick = () => {
    setIsActive((current) => !current);
    setInputsEnabled((enabled) => !enabled);
  };

  return (
    <section className="timer">
      <h1>Timer</h1>
      <label htmlFor="hours">Hours:</label>
      <input
        type="number"
        id="hours"
        min={0}
        max={23}
        value={time.hours}
        onKeyDown={(event) => handleTimeChange(event, 'hours')}
        onChange={(event) => handleTimeChange(event, 'hours')}
        disabled={!inputsEnabled}
      />
      <label htmlFor="minutes">Minutes:</label>
      <input
        type="number"
        id="minutes"
        min={0}
        max={59}
        value={time.minutes}
        onKeyDown={(event) => handleTimeChange(event, 'minutes')}
        onChange={(event) => handleTimeChange(event, 'minutes')}
        disabled={!inputsEnabled}
      />
      <label htmlFor="seconds">Seconds:</label>
      <input
        type="number"
        id="seconds"
        min={0}
        max={59}
        value={time.seconds}
        onKeyDown={(event) => handleTimeChange(event, 'seconds')}
        onChange={(event) => handleTimeChange(event, 'seconds')}
        disabled={!inputsEnabled}
      />
      <Button onClick={handleClick} text={isActive ? 'Pause' : 'Start'} />
    </section>
  );
}

