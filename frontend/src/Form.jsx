import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from './useGlobalContext';
import Button from './Button';
import { plus } from './Icons';


function Form() {
    const {addIncome, getIncomes, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        type: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category,description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title: '',
            amount: '',
            type: '',
            date: '',
            category: '',
            description: '',
        })
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Salary Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}


const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input, textarea, select {
        font-family: inherit; /* Keeps the font consistent with the rest of your design */
        font-size: 1.2rem; /* Increased font size for better readability */
        outline: none;
        border: none;
        padding: 0.8rem 1rem; /* Increased padding for a larger, more accessible touch target */
        border-radius: 8px; /* Slightly larger radius for a modern look */
        border: 2px solid #fff; /* Maintains border style, consider using a more visible color for accessibility */
        background: transparent;
        resize: none; /* Keeps textarea from being manually resized */
        box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1); /* Slightly more pronounced shadow for depth */
        color: rgba(34, 34, 96, 0.9); /* Keeps text color */
        transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transition for focus effects */

        &:focus {
            border-color: var(--color-primary); /* Brighter border on focus for better visibility, replace with your primary color variable */
            box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2); /* More pronounced shadow on focus for depth */
        }

        &::placeholder {
            color: rgba(34, 34, 96, 0.4); /* Keeps placeholder color */
        }
    }

    .input-control input {
        width: 100%; /* Ensures input takes up all available width */
    }

    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: rgba(34, 34, 96, 0.4); /* Placeholder-like color for select elements */
            &:focus, &:active {
                color: rgba(34, 34, 96, 1); /* Darker color for active or focused select elements */
            }
        }
    }

    .submit-btn {
        padding-left: 6rem; /* Keeps left padding */
        button {
            box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1); /* Consistent shadow style with inputs */
            transition: background-color 0.3s, box-shadow 0.3s; /* Smooth transition for hover effect */

            &:hover {
                background: var(--color-green) !important; /* Ensure hover background color change, use your variable for green color */
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2); /* Slightly more pronounced shadow on hover for button */
            }
        }
    }

`;
export default Form