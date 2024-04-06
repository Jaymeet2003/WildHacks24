import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from './useGlobalContext'
import { dateFormat } from './dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes, expenses} = useGlobalContext() //eslint-disable-next-line
    const {totalIncome} = useGlobalContext()
    const allDates = [...incomes, ...expenses].map(item => dateFormat(item.date));
    const uniqueDates = [...new Set(allDates)];
    uniqueDates.sort((a, b) => new Date(a) - new Date(b));
    incomes.sort((a, b) => new Date(dateFormat(a.date)) - new Date(dateFormat(b.date)));
    expenses.sort((a, b) => new Date(dateFormat(a.date)) - new Date(dateFormat(b.date)));
    const data = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Income',
                data: uniqueDates.map(date => {
                    // Find the income for the specific date or return 0 if not found
                    const income = incomes.find(inc => dateFormat(inc.date) === date);
                    return income ? income.amount : 0;
                }),
                backgroundColor: 'black',
                tension: .2
            },
            {
                label: 'Expenses',
                data: uniqueDates.map(date => {
                    // Find the expense for the specific date or return 0 if not found
                    const expense = expenses.find(exp => dateFormat(exp.date) === date);
                    return expense ? expense.amount : 0;
                }),
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }


    return (
        <ChartStyled >
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart