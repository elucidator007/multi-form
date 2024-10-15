'use client'

import { useState } from "react";
import { QUESTIONS } from "@/utility/constant";
import AskQuestion from "./AskQuestion";

export default function Home() {
  
    const [currQuestionId, setCurrQuestionId] = useState(1);
  const [response, setResponse] = useState({});

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#E5D9F2] to-[#F5EFFF]">
      <div className="text-3xl font-bold mb-8 text-[#A594F9]">Multi Level Form</div>
      {QUESTIONS.map(item => (
        <div key={item.id}>
          {item.id === currQuestionId && (
            <AskQuestion 
              question={item} 
              currQuestionId={currQuestionId} 
              setResponse={setResponse} 
              setCurrQuestionId={setCurrQuestionId} 
              response={response}
            />
          )}
        </div>
      ))}
    </div>
  );
}
