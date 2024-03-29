'use client';

import Image from 'next/image';
import { useState } from 'react';
import questions from './assets/questions';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const goBack = (): void => {
    setCurrentQuestion(prev => prev - 1);
  };
  return (
    <div className='app bg-slate-100 flex flex-col justify-center items-center p-5 gap-4'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className='question-section bg-white p-5 text-lg flex flex-col gap-2 items-center rounded-lg shadow-md'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text text-4xl font-bold break-keep leading-20 w-[500px]'>
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className='answer-section flex flex-col gap-2'>
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button
                  className='w-200 bg-white text-black p-3 rounded-lg font-md shadow-sm
                  hover:text-blue-500 hover:font-bold hover:shadow-lg transition-all duration-300 ease-in-out hover:animate-clicked '
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                  key={index}
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div>
          <div className='etc-func'>
            <button
              className='bg-slate-300 p-3 text-md rounded-md shadow-md'
              onClick={goBack}
            >
              뒤로 가기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
