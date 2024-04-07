import React, { useEffect, useState } from 'react';

function BudgetingTips() {
  const [tips, setTips] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/budgeting-tips')
      .then(response => response.json())
      .then(data => setTips(data.tips))
      .catch(error => console.error('Error fetching budgeting tips:', error));
  }, []);

  return (
    <div>
      <h2>Budgeting Tip: </h2>
      <p>{tips}</p>
    </div>
  );
}

export default BudgetingTips;