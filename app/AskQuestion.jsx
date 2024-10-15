
import React from 'react'
import { useEffect } from 'react'

const AskQuestion = ({ question, currQuestionId, setResponse, setCurrQuestionId, response }) => {
    const handleBackClick = () => {
      setCurrQuestionId(prev => prev - 1);
    };
    
    const handleNextClick = () => {
      setCurrQuestionId(prev => prev + 1);
    };
  
    const handleValueChange = (e) => {
      const input = e.target.value;
      setResponse(prev => ({...prev, [question.question_keyword]: input}));
    };
  
    React.useEffect(() => {
      if (!response[question.question_keyword])
        setResponse(prev => ({...prev, [question.question_keyword]: ""}));
    }, []);
  
    return (
      <div className="flex flex-col justify-center items-center gap-5 bg-[#F5EFFF] p-8 rounded-lg shadow-md">
        {currQuestionId > 1 && (
          <button 
            className="text-[#A594F9] hover:text-[#CDC1FF] text-right self-start"
            onClick={handleBackClick}
          >
            Go Back
          </button>
        )}
        <div className="flex flex-col gap-5 w-full max-w-md">
          <div className="text-center text-[#A594F9] font-semibold">{question.question}</div>
          <input 
            className="border-2 border-[#CDC1FF] rounded-full px-4 py-2 w-full focus:outline-none focus:border-[#A594F9]"
            type="text"
            value={response[question.question_keyword]}
            onChange={handleValueChange}
          />
        </div>
  
        {currQuestionId < 5 ? (
          <button 
            className="bg-[#A594F9] text-white py-2 px-6 rounded-md hover:bg-[#CDC1FF] transition-colors"
            onClick={handleNextClick}
          >
            Next
          </button>
        ) : (
          <button 
            className="bg-[#E5D9F2] text-[#A594F9] py-2 px-6 rounded-lg hover:bg-[#CDC1FF] hover:text-white transition-colors"
          >
            Submit
          </button>
        )}
      </div>
    );
  };

export default AskQuestion
