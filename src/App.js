import React, { useState, useEffect } from 'react';

function App() {
  const [seconds, setSeconds] = useState(1500); // 25 minutes en secondes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isRunning && seconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(1500); // Réinitialiser à 25 minutes
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div className="timer">
        <p>{formatTime(seconds)}</p>
      </div>
      <div className="controls">
        {isRunning ? (
          <button onClick={pauseTimer}>Pause</button>
        ) : (
          <button onClick={startTimer}>Démarrer</button>
        )}
        <button onClick={resetTimer}>Réinitialiser</button>
      </div>
    </div>
  );
}

export default App;
