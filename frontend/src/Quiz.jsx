import React, { useEffect, useState } from 'react';
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
  min-height: 300px; // Ensure there's enough space

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

  .centered-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
  }
`;

const ExplanationBox = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #333;
`;

function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionCounter, setQuestionCounter] = useState(0);

  useEffect(() => {
    if (questionCounter < 5) {
      fetch(`http://localhost:3000/quiz?questionNumber=${questionCounter}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setQuizData(data))
        .catch(error => console.error('Error fetching Quiz:', error));
    }
  }, [questionCounter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = quizData.correctAnswer === selectedOption.charAt(0);
    setIsCorrect(correct);

    setTimeout(() => {
      setQuizData(null);
      setSelectedOption('');
      setIsCorrect(null);
      setQuestionCounter(questionCounter + 1);
    }, 2000); // Delay for showing explanation
  };

  if (questionCounter >= 5) {
    return (
      <QuizStyled>
        <div className="centered-message">Quiz completed!</div>
      </QuizStyled>
    );
  }

  if (!quizData) return 
      <QuizStyled>
       <div className="centered-message">Loading...</div>;
      </QuizStyled>
  

  return (
    <QuizStyled>
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        <p>{quizData.question}</p>
        {quizData.options[0].map((option, index) => (
          <label key={index} style={{ display: 'block', margin: '10px 0' }}>
            <input
              type="radio"
              name="option"
              value={option.charAt(0)}
              onChange={(e) => setSelectedOption(e.target.value)}
              checked={selectedOption === option.charAt(0)}
            />
            {option}
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>
      {isCorrect !== null && (
        <ExplanationBox>
          {isCorrect ? 'Correct!' : `Incorrect. Here's why: ${quizData.explanation}`}
        </ExplanationBox>
      )}
    </QuizStyled>
  );
}

export default Quiz;
