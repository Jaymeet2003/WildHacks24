import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from './useGlobalContext';
import History from './History';
import { InnerLayout } from './Layouts';
import { dollar } from './Icons';
import Chart from './Chart';
import Tip from './tips';
import Button from './Button';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled>
            {/* <div className="Input-control">
                <select name="category" id="category">
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div> */}
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <div className = "chart"><Chart /></div>
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total income:</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense:</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance:</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="tip">
                        <h2><Tip /></h2>
                    </ div>  
                </div>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`

.Input-control{
    position: relative;
    top: 75px;
    left: 20px
}
align-items: center;
padding: 2rem;
h1{
    padding-left: 200px;
    padding-bottom: 40px;
}
.stats-con {
    display: flex;
    gap: 2rem; /* Add gap between chart and statistics */
}

/* Style the container for the chart and its statistics */
.chart-con {
    display: flex;
    flex-direction: column;
   p{
    
   }
}

/* Style the chart */
.chart-con .chart {
    
    margin-bottom: 2rem; /* Add space below the chart */
}

/* Style the container for income, expense, and balance */
.amount-con {
    display: flex;
    gap: 1rem; /* Add gap between income, expense, and balance */
}

/* Style the individual income, expense, and balance sections */
.income, .expense, .balance {
    h2{
        font-size: 1.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }
    p{
        text-align: center;
    }
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
}

/* Style the tip container */
.tip {
    width: 400px;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    flex-shrink: 10; /* Prevent it from shrinking */
    p{
        display: flex;
        font-weight: normal;
        font-size: 1.25rem;
        margin-bottom: 1rem;
        padding-top: 5%;
    }
    h2{
        font-size: 2rem;
        margin-bottom: 1rem;
        text-align: center;
    }
}
`;

export default Dashboard