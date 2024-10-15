import React, { useState, useEffect, useRef } from 'react';

const AskQuestion = ({ question, currQuestionId, setResponse, setCurrQuestionId, response }) => {
    const [localValue, setLocalValue] = useState('');
    const debouncedSetResponseRef = useRef(null);

    const debounce = (func, delay) => {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    useEffect(() => {
        debouncedSetResponseRef.current = debounce((input) => {
            setResponse(prev => ({...prev, [question.question_keyword]: input}));
        }, 2000);
    }, [question.question_keyword, setResponse]);

    const handleBackClick = () => {
        setCurrQuestionId(prev => prev - 1);
    };
    
    const handleNextClick = () => {
        setCurrQuestionId(prev => prev + 1);
    };

    const handleValueChange = (e) => {
        const input = e.target.value;
        setLocalValue(input);
        if (debouncedSetResponseRef.current) {
            debouncedSetResponseRef.current(input);
        }
    };

    useEffect(() => {
        if (response[question.question_keyword] !== undefined) {
            setLocalValue(response[question.question_keyword]);
        } else {
            setResponse(prev => ({...prev, [question.question_keyword]: ""}));
            setLocalValue("");
        }
    }, [question.question_keyword, response, setResponse]);

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
                    value={localValue}
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

export default AskQuestion;