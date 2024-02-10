import React, { useState, useEffect } from 'react';
import './QuizApp.css'; // Import CSS file for styling

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [points, setPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  // Mock data for questions
  const questions = [
    {
      question: "What is the capital of France?",
      options: [
        { text: "Paris", isCorrect: true },
        { text: "London", isCorrect: false },
        { text: "Berlin", isCorrect: false },
        { text: "Rome", isCorrect: false }
      ]
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        { text: "Pacific Ocean", isCorrect: true },
        { text: "Atlantic Ocean", isCorrect: false },
        { text: "Indian Ocean", isCorrect: false },
        { text: "Arctic Ocean", isCorrect: false }
      ]
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: [
        { text: "Harper Lee", isCorrect: true },
        { text: "Ernest Hemingway", isCorrect: false },
        { text: "Mark Twain", isCorrect: false },
        { text: "F. Scott Fitzgerald", isCorrect: false }
      ]
    },
    {
      question: "What is the chemical symbol for gold?",
      options: [
        { text: "Au", isCorrect: true },
        { text: "Ag", isCorrect: false },
        { text: "Fe", isCorrect: false },
        { text: "Cu", isCorrect: false }
      ]
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: [
        { text: "Mars", isCorrect: true },
        { text: "Venus", isCorrect: false },
        { text: "Jupiter", isCorrect: false },
        { text: "Saturn", isCorrect: false }
      ]
    },
    {
      question: "What is the capital of Japan?",
      options: [
        { text: "Tokyo", isCorrect: true },
        { text: "Beijing", isCorrect: false },
        { text: "Seoul", isCorrect: false },
        { text: "Bangkok", isCorrect: false }
      ]
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        { text: "Leonardo da Vinci", isCorrect: true },
        { text: "Pablo Picasso", isCorrect: false },
        { text: "Vincent van Gogh", isCorrect: false },
        { text: "Michelangelo", isCorrect: false }
      ]
    },
    {
      question: "What is the capital of Australia?",
      options: [
        { text: "Canberra", isCorrect: true },
        { text: "Sydney", isCorrect: false },
        { text: "Melbourne", isCorrect: false },
        { text: "Perth", isCorrect: false }
      ]
    },
    // Add three more questions here
    {
      question: "Who is the author of 'Harry Potter' series?",
      options: [
        { text: "J.K. Rowling", isCorrect: true },
        { text: "Stephen King", isCorrect: false },
        { text: "George R.R. Martin", isCorrect: false },
        { text: "Agatha Christie", isCorrect: false }
      ]
    },
    {
      question: "What is the tallest mountain in the world?",
      options: [
        { text: "Mount Everest", isCorrect: true },
        { text: "K2", isCorrect: false },
        { text: "Kangchenjunga", isCorrect: false },
        { text: "Lhotse", isCorrect: false }
      ]
    },
    {
      question: "Who invented the telephone?",
      options: [
        { text: "Alexander Graham Bell", isCorrect: true },
        { text: "Thomas Edison", isCorrect: false },
        { text: "Nikola Tesla", isCorrect: false },
        { text: "Albert Einstein", isCorrect: false }
      ]
    }
  ];
  

  useEffect(() => {
    const quizData = JSON.parse(localStorage.getItem('quizData'));
    if (quizData) {
      setCurrentQuestion(quizData.currentQuestion);
      setPoints(quizData.points);
      setQuizStarted(quizData.quizStarted);
      setQuizCompleted(quizData.quizCompleted);
      setSelectedOption(quizData.selectedOption);
      setIsAnswered(quizData.isAnswered);
      setIsCorrect(quizData.isCorrect);
      setCorrectAnswerIndex(quizData.correctAnswerIndex);
      setIsButtonDisabled(quizData.isButtonDisabled);
    }
  }, []);

  useEffect(() => {
    const quizData = {
      currentQuestion,
      points,
      quizStarted,
      quizCompleted,
      selectedOption,
      isAnswered,
      isCorrect,
      correctAnswerIndex,
      isButtonDisabled
    };
    localStorage.setItem('quizData', JSON.stringify(quizData));
  }, [currentQuestion, points, quizStarted, quizCompleted, selectedOption, isAnswered, isCorrect, correctAnswerIndex, isButtonDisabled]);

  // Function to handle user's answer selection
  const handleAnswerSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setIsButtonDisabled(false);
    const correctIndex = questions[currentQuestion].options.findIndex(option => option.isCorrect);
    setCorrectAnswerIndex(correctIndex);
    setIsAnswered(true);
    if (questions[currentQuestion].options[optionIndex].isCorrect) {
      setPoints(points + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsButtonDisabled(true);
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      setQuizCompleted(true);
    }
  };

  // Function to finish the quiz
  const finishQuiz = () => {
    setQuizCompleted(true);
  };

  // Function to start the quiz
  const startQuiz = () => {
    setCurrentQuestion(0);
    setQuizStarted(true);
  };

  // Render components based on current state
  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <div className="welcome-screen">
          <h1>Welcome to the Quiz!</h1>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-content">
          {!quizCompleted ? (
            <div>
              <h1>Question {currentQuestion + 1}</h1>
              <p>{questions[currentQuestion].question}</p>
              <div className="option-container">
                <ol type="1">
                  {questions[currentQuestion].options.map((option, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="options"
                        value={index}
                        checked={selectedOption === index}
                        onChange={() => handleAnswerSelect(index)}
                      />
                      <label htmlFor={`option-${index}`}>{option.text}</label>
                    </li>
                  ))}
                </ol>
              </div>
              {isAnswered && currentQuestion < questions.length - 1 && (
                <button onClick={handleNextQuestion}>Next Question</button>
              )}
              {isAnswered && currentQuestion === questions.length - 1 && (
                <button onClick={finishQuiz}>Finish</button>
              )}
              {isAnswered && (
                <div>
                  {isCorrect ? (
                    <p>Your answer is correct!</p>
                  ) : (
                    <p>Your answer is incorrect!</p>
                  )}
                  <p>Correct Answer: {questions[currentQuestion].options[correctAnswerIndex].text}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="end-screen">
              <h1>Quiz Completed!</h1>
              <p>Total Points: {points}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
