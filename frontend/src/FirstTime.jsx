import React, {useState} from 'react';
import styled from 'styled-components';
import bg from './img/bg.png'
import { useGlobalContext } from './useGlobalContext';
import { plus } from './Icons';
const Button = styled.button`
    background: var(--primary-color4-green); /* Uses the variable for consistency */
    color: #fff;
    border: ;
    
    padding: 10px 200px;
    border-radius: 20px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        background: #d4e6d5; /* Lighter green on hover */
    }
    margin-top: 1rem; /* Adds space above the button */
`;

const FormContainer = styled.div`
    display: grid;
    background: url(${bg}); /* Light pink background */
    flex-direction: column;
    flex-grow: 1; /* Allows the form to take up all available space */
    flex-start: end;
    height: 100vh; /* Full height of the viewport */
    padding-left: 30%;
    padding-right: 25%;
    padding-top: 0.4rem;
    gap: 1rem; /* Adds space between child elements */
    justify-content: center; /* Center items along the main axis */
    
    align-items: center; /* Centers the items horizontally */
    h1 {
        align-self: flex-start; /* Aligns the title to the start of the container */
        padding-left: 17rem;
    }
`;

const InputContainer = styled.div`
    display: flex;
    background: #FCF6F9;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
`;

const Label = styled.label`
    font-size: 1.2rem;
    flex-shrink: 0; /* Prevents the label from shrinking */
    margin-right: 0.5rem; /* Ensures gap between label and input */
`;

const Input = styled.input`
    display: flex;
    font-family: inherit;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background: #FFFFFF; /* Makes input background white */
    padding: 0.8rem 1rem;
    border-radius: 10px; /* Rounds the corners of the input field */
    flex-grow: 1; /* Allows input to expand */
    &:focus {
        border: 2px solid var(--primary-color4-green); /* Border color on focus */
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1); /* Adds a shadow on focus */
    }
    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &[type='number'] {
        -moz-appearance: textfield;
    }
`;



const ImgStyled = styled.div`
    img{
        zIndex: -1;
    }
`;




const FirstTime = () => {
    

    const {addFirstData, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        yearlyIncome: '',
        goal: '',
        occupation: ''
    })
    const {yearlyIncome, goal, occupation} = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addFirstData(inputState)
        setInputState({
            yearlyIncome: '',
            goal: '',
            occupation: ''
        })
    }

    return (
        <ImgStyled>
            
            <FormContainer>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label htmlFor="yearlyIncome">Yearly Income:</Label>
                        <Input type="text"
                         value={yearlyIncome}
                          name={'yearlyIncome'} 
                          placeholder="Yearly Salary"
                          onChange={handleInput('yearlyIncome')} />
                    </InputContainer>

                    <InputContainer>
                        <Label htmlFor="goal">Goal:</Label>
                        <Input type="text"
                         value={goal}
                          name={'goal'} 
                          placeholder="Goal"
                          onChange={handleInput('goal')} />
                    </InputContainer>

                    <InputContainer>
                        <Label htmlFor="occupation">Occupation:</Label>
                        <Input type="text"
                         value={occupation}
                          name={'occupation'} 
                          placeholder="Occupation"
                          onChange={handleInput('occupation')} />
                    </InputContainer>

                    {/* Add more input fields here for other fields */}
                    
                    <Button name={'Add Information'}
                        icon={plus}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--color-accent'}
                        color={'#fff'} />
                </form>
            </FormContainer>
        </ImgStyled>
    );
};

export default FirstTime;