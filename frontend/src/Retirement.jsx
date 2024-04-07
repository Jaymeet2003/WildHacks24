import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Retirement = () => {
    const [formData, setFormData] = useState({
        principal: '',
        interestRate: '',
        yearsToRetirement: '',
        monthlyContribution: '',
    });
    const [calculatedValues, setCalculatedValues] = useState({
        withInterest: 0,
        withoutInterest: 0,
    });
    const [error, setError] = useState('');
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && calculatedValues.withInterest && calculatedValues.withoutInterest) {
            if (window.myChart instanceof Chart) {
                window.myChart.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            window.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: parseInt(formData.yearsToRetirement) }, (_, i) => i + 1),
                    datasets: [{
                        label: 'Total Savings with Compound Interest',
                        data: Array.from({ length: parseInt(formData.yearsToRetirement) }, (_, i) => 
                            calculateTotalAmountWithMonthlyContributions(
                                parseFloat(formData.principal), 
                                parseFloat(formData.interestRate), 
                                i + 1, 
                                parseFloat(formData.monthlyContribution)
                            )),
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                    {
                        label: 'Total Savings without Interest',
                        data: Array.from({ length: parseInt(formData.yearsToRetirement) }, (_, i) => 
                            parseFloat(formData.principal) + (parseFloat(formData.monthlyContribution) * (i + 1) * 12)),
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Amount ($)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Years'
                            }
                        }
                    }
                }
            });
        }
    }, [calculatedValues, formData]);

    const calculateTotalAmountWithMonthlyContributions = (principal, rate, time, monthlyContribution) => {
        rate = rate / 100;
        const monthlyRate = rate / 12;
        let amount = principal * Math.pow(1 + monthlyRate, time * 12);
        for (let i = 1; i <= time * 12; i++) {
            amount += monthlyContribution * Math.pow(1 + monthlyRate, i);
        }
        return amount;
    };

    const handleInput = (name) => (e) => {
        setFormData({ ...formData, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { principal, interestRate, yearsToRetirement, monthlyContribution } = formData;

        if (!principal || !interestRate || !yearsToRetirement || !monthlyContribution) {
            setError('Please fill in all fields');
            return;
        }

        const totalYears = parseInt(yearsToRetirement);
        const totalWithInterest = calculateTotalAmountWithMonthlyContributions(
            parseFloat(principal), parseFloat(interestRate), totalYears, parseFloat(monthlyContribution)
        );
        const totalWithoutInterest = parseFloat(principal) + (parseFloat(monthlyContribution) * totalYears * 12);

        setCalculatedValues({
            withInterest: totalWithInterest.toFixed(2),
            withoutInterest: totalWithoutInterest.toFixed(2),
        });
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-row">
                <input
                    required
                    value={formData.principal}
                    onChange={handleInput('principal')}
                    type="number"
                    placeholder="Principal"
                />
                <input
                    required
                    value={formData.interestRate}
                    onChange={handleInput('interestRate')}
                    type="number"
                    placeholder="Interest Rate (%)"
                />
            </div>
            <div className="input-row">
                <input
                    required
                    value={formData.yearsToRetirement}
                    onChange={handleInput('yearsToRetirement')}
                    type="number"
                    placeholder="Years to Retirement"
                />
                <input
                    required
                    value={formData.monthlyContribution}
                    onChange={handleInput('monthlyContribution')}
                    type="number"
                    placeholder="Monthly Contribution"
                />
            </div>
            <button type="submit">Calculate</button>
            <ValuesDisplay>
                <p>Total with Interest: ${calculatedValues.withInterest}</p>
                <p>Total without Interest: ${calculatedValues.withoutInterest}</p>
            </ValuesDisplay>
            <canvas ref={chartRef}></canvas>
        </ExpenseFormStyled>
    );
};

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;

    .input-row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 600px;

        input {
            width: 48%; /* Adjust based on your layout */
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    }

    button {
        background: var(--color-primary, #f00);
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 20px;
        cursor: pointer;
    }

    .error {
        color: red;
    }

    canvas {
        width: 100% !important;
        max-width: 500px; /* Adjusted for a smaller chart */
        margin-top: 20px;
    }
`;

const ValuesDisplay = styled.div`
    padding: 15px;
    margin-top: 20px;
    border-radius: 8px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    width: 100%;
    max-width: 600px;
`;

export default Retirement;
