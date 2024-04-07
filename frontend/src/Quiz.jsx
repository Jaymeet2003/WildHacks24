import React, { useEffect, useState } from 'react';
import { useGlobalContext } from "./useGlobalContext";
import styled from 'styled-components';

const QuizStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;

  button {
    background: var(--color-primary, #f00);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      background: var(--color-primary-dark, #c00);
    }
  }
`;

function Quiz() {
  const { checkAnswer } = useGlobalContext(); // Assuming this function is defined in your context
  const [quizData, setQuizData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Placeholder for fetch call
    fetch('http://localhost:3000/quiz')
      .then(response => response.json())
      .then(data => setQuizData(data))
      .catch(error => console.error('Error fetching Quiz:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer(selectedOption); // Implement this function based on your backend logic
  };

  if (!quizData) return <div>Loading...</div>;

  return (
    <QuizStyled>
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        <p>{quizData.question}</p>
        {quizData.options.map((option, index) => (
          <label key={index} style={{ display: 'block', margin: '10px 0' }}>
            <input
              type="radio"
              name="option"
              value={option}
              onChange={(e) => setSelectedOption(e.target.value)}
              checked={selectedOption === option}
            />
            {option}
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>
    </QuizStyled>
  );
}

export default Quiz;