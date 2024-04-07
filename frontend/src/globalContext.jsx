import React, { useContext, useState } from "react"
import axios from 'axios'
import PropTypes from 'prop-types';


const BASE_URL = "http://localhost:3000";


export const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        try {
            const response = await fetch(`${BASE_URL}/add-income`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(income),
              credentials: 'include', // Important for CORS and sending cookies
            });
            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            console.log('Income added:', data);

            getIncomes();
          } catch (error) {
            console.error('Error:', error);
            setError(error.message);
          }
    }
    GlobalProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const getIncomes = async () => {
        const response = await fetch(`${BASE_URL}/get-income`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIncomes(data); // Use the parsed JSON data directly
        console.log(data);
    }

    const deleteIncome = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/delete-income/${id}`, {
                method: 'DELETE', // Specify the method explicitly
                credentials: 'include', // If you need credentials such as cookies, authorization headers or TLS client certificates to be sent with the request
            });
            if (!response.ok) {
                throw new Error('Failed to delete income');
            }
            getIncomes(); // Refresh the incomes list
        } catch (error) {
            console.error('Error:', error);
            setError(error.message); // Assuming you have an setError function to handle errors
        }
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (expense) => {
        try {
            const response = await fetch(`${BASE_URL}/add-expense`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
              credentials: 'include', // Important for CORS and sending cookies
            });
            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            console.log('expense added:', data);

            getExpenses();
          } catch (error) {
            console.error('Error:', error);
            setError(error.message);
          }
    }

    const getExpenses = async () => {
        const response = await fetch(`${BASE_URL}/get-expense`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExpenses(data); // Use the parsed JSON data directly
        console.log(data);
    }

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/delete-expense/${id}`, {
                method: 'DELETE', // Specify the method explicitly
                credentials: 'include', // If you need credentials such as cookies, authorization headers or TLS client certificates to be sent with the request
            });
            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }
            getExpenses(); // Refresh the incomes list
        } catch (error) {
            console.error('Error:', error);
            setError(error.message); // Assuming you have an setError function to handle errors
        }
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })

        return totalExpenses;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}