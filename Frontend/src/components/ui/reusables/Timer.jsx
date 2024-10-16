import React, { useState, useEffect } from "react";

const Timer = ({ initialMinutes = 0, initialSeconds = 0, setTimesup, timesup}) => {
  const [minutes, setMinutes] = useState(Number(initialMinutes));
  const [seconds, setSeconds] = useState(Number(initialSeconds));

  useEffect(() => {
    const interval = setInterval(() => {
      if(timesup)
      {
        clearInterval(interval);
      }
      else if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else if (seconds === 0 && minutes > 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else {
        setTimesup(true);
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div>
      <h1>{`${formatTime(minutes)}:${formatTime(seconds)}`}</h1>
    </div>
  );
};

export default Timer;
