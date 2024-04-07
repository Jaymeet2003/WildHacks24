import {dashboard, expenses, transactions, trend, Batl, reward, calculator} from './Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {   
        id: 5,
        title: "Savings Battles",
        icon: Batl,
        link: "/",
    },
    {
        id: 6,
        title: "Quiz Corner: Financial Wisdom Unlocked",
        icon: reward,
        link: "/",
    },
    {
        id: 7,
        title: "Retirement Calculator",
        icon: calculator,
        link: "/",
    },
    {
        id: 8,
        title: "Portfolio Tracker",
        icon: dashboard,
        link: "/",
    },
    
]