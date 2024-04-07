import React, { useEffect } from 'react'
import { useGlobalContext } from './useGlobalContext';

function Table() {
    const { users, getUsers } = useGlobalContext()
    const scores = users.map(user => user.score);

    useEffect(() => {
        const intervalId = setInterval(() => {
          getUsers();
        }, 60000); // Fetches user data every 10 seconds
    
        return () => clearInterval(intervalId); // Clears interval on component unmount
    }, []);

    return (
        <div>
          {scores.map((score, index) => (
            <h1 key={index}>Score: {score}</h1>
          ))}
        </div>
    );
}

export default Table;