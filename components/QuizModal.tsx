import React, { useState } from 'react';
import { QuizData } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizData: QuizData | null;
  isLoading: boolean;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quizData, isLoading }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const handleOptionClick = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const handleValidate = () => {
    if (selectedOption === null || !quizData) return;
    
    const isCorrect = selectedOption === quizData.questions[currentQuestionIdx].correctAnswerIndex;
    if (isCorrect) setScore(s => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (!quizData) return;
    if (currentQuestionIdx < quizData.questions.length - 1) {
      setCurrentQuestionIdx(p => p + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // End of quiz
      onClose();
      // Reset logic could go here or be handled by parent
      setCurrentQuestionIdx(0);
      setSelectedOption(null);
      setShowResult(false);
      setScore(0);
      alert(`Quiz terminé ! Votre score : ${score + (selectedOption === quizData.questions[currentQuestionIdx].correctAnswerIndex ? 1 : 0)} / ${quizData.questions.length}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-literature-accent mb-4"></div>
            <p className="text-literature-dark font-serif animate-pulse">L'IA génère votre quiz personnalisé...</p>
          </div>
        ) : quizData ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-literature-accent uppercase tracking-wider">
                Question {currentQuestionIdx + 1}/{quizData.questions.length}
              </span>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2">
                {quizData.questions[currentQuestionIdx].question}
              </h2>
            </div>

            <div className="space-y-3 mb-8">
              {quizData.questions[currentQuestionIdx].options.map((option, idx) => {
                let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                if (showResult) {
                  if (idx === quizData.questions[currentQuestionIdx].correctAnswerIndex) {
                    btnClass += "border-green-500 bg-green-50 text-green-900";
                  } else if (idx === selectedOption) {
                    btnClass += "border-red-500 bg-red-50 text-red-900";
                  } else {
                    btnClass += "border-gray-100 opacity-50";
                  }
                } else {
                  btnClass += selectedOption === idx 
                    ? "border-literature-accent bg-orange-50 text-literature-dark" 
                    : "border-gray-100 hover:border-gray-300 text-gray-700";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={btnClass}
                    disabled={showResult}
                  >
                    <div className="flex items-center">
                       <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 border ${selectedOption === idx || (showResult && idx === quizData.questions[currentQuestionIdx].correctAnswerIndex) ? 'border-current' : 'border-gray-300'}`}>
                         {String.fromCharCode(65 + idx)}
                       </span>
                       {option}
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="mb-6 p-4 bg-blue-50 text-blue-900 rounded-lg text-sm">
                <strong>Explication : </strong> {quizData.questions[currentQuestionIdx].explanation}
              </div>
            )}

            <div className="flex justify-end">
              {!showResult ? (
                <button 
                  onClick={handleValidate}
                  disabled={selectedOption === null}
                  className="bg-literature-dark text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Valider
                </button>
              ) : (
                <button 
                  onClick={handleNext}
                  className="bg-literature-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-800 transition-colors"
                >
                  {currentQuestionIdx < quizData.questions.length - 1 ? 'Question suivante' : 'Terminer'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-red-500">Erreur de chargement du quiz.</div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;