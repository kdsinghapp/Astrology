import { useEffect } from "react";

const TimerApp = ({
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 59) {
        if (minutes === 59) {
          setHours((prevHours) => prevHours + 1);
          setMinutes(0);
          setSeconds(0);
        } else {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        }
      } else {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);

    // Save the time values to localStorage before the component unmounts
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("timerHours", hours);
      localStorage.setItem("timerMinutes", minutes);
      localStorage.setItem("timerSeconds", seconds);
    });

    return () => {
      clearInterval(intervalId);
    };
  }, [hours, minutes, seconds]);

  useEffect(() => {
    // Retrieve the time values from localStorage on component mount
    const storedHours = parseInt(localStorage.getItem("timerHours")) || 0;
    const storedMinutes = parseInt(localStorage.getItem("timerMinutes")) || 0;
    const storedSeconds = parseInt(localStorage.getItem("timerSeconds")) || 0;

    setHours(storedHours);
    setMinutes(storedMinutes);
    setSeconds(storedSeconds);
  }, []);

  const formattedTime = `${hours > 0 ? hours + ":" : ""}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  return formattedTime;
};

export default TimerApp;
