import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Function to update the time state
    function refreshClock() {
      setTime(new Date());
    }

    // Set up the interval timer
    const timerId = setInterval(refreshClock, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []); 

  return (
    <div>
      <p>{time.toLocaleTimeString(undefined, {timeStyle:'short'})}</p>
      <p>{time.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
        })}</p>
    </div>
  );
}

export default Clock;
