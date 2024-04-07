import React, { useEffect, useState } from 'react';
import { useGlobalContext } from './useGlobalContext';

function Table() {
    const { users, getUsers, loading, error } = useGlobalContext(); // Assume loading and error states are provided by your global context

    useEffect(() => {
        getUsers(); // Initial fetch
        const intervalId = setInterval(() => {
            getUsers();
        }, 60000); // Fetches user data every 60 seconds

        return () => clearInterval(intervalId); // Clears interval on component unmount
    }, [getUsers]);

    // Sort users by score in descending order
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    // Check if loading
    if (loading) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    // Check if there was an error during fetch
    if (error) {
        return <div>Error fetching data</div>; // Placeholder for error state
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Leaderboard</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "2px solid black", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Rank</th>
                        <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Name</th>
                        <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{user.name}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
