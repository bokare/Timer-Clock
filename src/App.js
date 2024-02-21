import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [brakeCount, setbrakeCount] = useState(5);
  const [sessionCount, setsessionCount] = useState(25);
  const [sessionTime, setsessionTime] = useState(true);

  const [minutes, setMinutes] = useState(sessionCount);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setMinutes(sessionCount);
    setSeconds(0);
  }, [sessionCount]);

  useEffect(() => {
    if (isRunning) {
      let timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          // clearInterval(timer);
          // setIsRunning(false);
          let audioElem = new Audio();
          audioElem.src =
            "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";
          audioElem.currentTime = 0;
          audioElem.play();

          if (sessionTime) {
            setsessionTime(false);
            setMinutes(brakeCount);
          } else {
            setsessionTime(true);
            setMinutes(sessionCount);
          }
        } else if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [minutes, seconds, isRunning]);

  return (
    <div id="container">
      <div id="app">
        <div>
          <div className="main-title">25 + 5 Clock</div>
          <div className="length-control">
            <div id="break-label">Break Length</div>
            <button
              className="btn-level"
              id="break-decrement"
              value="-"
              onClick={() => {
                if (brakeCount > 1 && !isRunning) {
                  setbrakeCount(brakeCount - 1);
                }
              }}
            >
              <i className="fa fa-arrow-down fa-2x"></i>
            </button>
            <div className="btn-level mx-2" id="break-length">
              {brakeCount}
            </div>
            <button
              className="btn-level"
              id="break-increment"
              value="+"
              onClick={() => {
                if (brakeCount < 60 && !isRunning) {
                  setbrakeCount(brakeCount + 1);
                }
              }}
            >
              <i className="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
          <div className="length-control">
            <div id="session-label">Session Length</div>
            <button
              className="btn-level"
              id="session-decrement"
              value="-"
              onClick={() => {
                if (sessionCount > 1 && !isRunning) {
                  setsessionCount(sessionCount - 1);
                }
              }}
            >
              <i className="fa fa-arrow-down fa-2x"></i>
            </button>
            <div className="btn-level mx-2" id="session-length">
              {sessionCount}
            </div>
            <button
              className="btn-level"
              id="session-increment"
              value="+"
              onClick={() => {
                if (sessionCount < 60 && !isRunning) {
                  setsessionCount(sessionCount + 1);
                }
              }}
            >
              <i className="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
          <div className="timer">
            <div
              className="timer-wrapper"
              style={{ color: minutes < 1 ? "red" : "white" }}
            >
              <div id="timer-label">{sessionTime ? "Session" : "Brake"}</div>
              <div id="time-left">
                {minutes < 10 ? `0${minutes}` : minutes} :{" "}
                {seconds < 10 ? `0${seconds}` : seconds}
              </div>
            </div>
          </div>
          <div className="timer-control">
            <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
              <i className="fa fa-play fa-2x"></i>
              <i className="fa fa-pause fa-2x"></i>
            </button>
            <button
              id="reset"
              onClick={() => {
                setsessionCount(25);
                setbrakeCount(5);
                setMinutes(25);
                setSeconds(0);
                setIsRunning(false);
                setsessionTime(true);
              }}
            >
              <i className="fa fa-refresh fa-2x"></i>
            </button>
          </div>

          <audio
            id="beep"
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ></audio>
        </div>
        <div class="author">
          {" "}
          by - <br />
          <a href="https://goo.gl/6NNLMG" target="_blank">
            Vaibhav Bokare
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
