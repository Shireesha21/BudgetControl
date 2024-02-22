import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, dispatch, currency, expenses } = useContext(AppContext);
  const [cost, setCost] = useState(budget);

  const handleBudgetChange = (newBudget) => {
    // Check if the new budget is less than the total spending
    const totalSpending = expenses.reduce((total, expense) => total + expense.cost, 0);

    if (newBudget < totalSpending) {
      alert('Budget cannot be lower than the total spending.');
    } else {
      // Update the budget in the context
      dispatch({
        type: 'SET_BUDGET',
        payload: newBudget,
      });
      // Update the local state
      setCost(newBudget);
    }
  };

  return (
    <div className='alert alert-secondary'>
      <span>
        Budget: {currency}{' '}
        <input
          type="number"
          value={cost}
          onChange={(event) => setCost(parseInt(event.target.value, 10))}
        />
        <button onClick={() => handleBudgetChange(cost)}>Set Budget</button>
      </span>
    </div>
  );
};

export default Budget;
