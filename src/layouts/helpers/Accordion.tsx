import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import React, { useState } from "react";

interface IQuestion {
  question: string;
  answer: string;
}

const Accordion = ({ questions }: { questions: IQuestion[] }) => {
  const [activeQuestion, setActiveQuestion] = useState<null | number>(0);

  const onClick = (index: number) => {
    if (index === activeQuestion) {
      setActiveQuestion(null);
      return;
    }
    setActiveQuestion(index);
  };

  return questions.map((question, index) => (
    <div key={index} className="lg:col-8">
      <div className={`accordion ${activeQuestion === index ? "active" : ""}`}>
        <button onClick={() => onClick(index)} className="accordion-header">
          <h5
            dangerouslySetInnerHTML={{ __html: markdownify(question.question) }}
          />
          <DynamicIcon className="accordion-icon" icon="FaAngleDown" />
        </button>
        <div className="accordion-content">
          <p
            className="py-3"
            dangerouslySetInnerHTML={{ __html: markdownify(question.answer) }}
          />
        </div>
      </div>
    </div>
  ));
};

export default Accordion;
