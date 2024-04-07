import React, { useState } from 'react';
import data from './output.json'; // Adjust the path as necessary

const StockTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13; // Display 15 stocks per page

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Navigate to the next page
  const nextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  // Navigate to the previous page
  const prevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  // Button styling
  const buttonStyle = {
    background: 'var(--color-primary, #f00)',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '20px',
    cursor: 'pointer',
    margin: '0 5px'
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Stock Data</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "2px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Symbol</th>
            <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Stock Price</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(stock => (
            <tr key={stock.symbol}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{stock.symbol}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{stock.name}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{stock.stock_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={prevPage} style={buttonStyle}>
          Previous
        </button>
        <button onClick={nextPage} style={buttonStyle}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StockTable;
