import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionModal from './QuestionModal';

const FormPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const history = useNavigate();

  const addQuestion = (question) => setQuestions([...questions, question]);

  const updateAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  // Navigate to review page with answers
  const handleReview = () => history('/review', { state:{answers} });

  return (
    <div>
      <h1>Dynamic Form</h1>
      <button onClick={() => setShowModal(true)}>Add Question</button>

      {questions.map((q, index) => (
        <div key={index}>
          <label>{q.text}</label>
          {q.type === 'Paragraph' ? (
            <textarea
              onChange={(e) => updateAnswer(index, e.target.value)}
            />
          ) : (
            <>
              {q.options.map((opt, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    value={opt}
                    onChange={(e) =>
                      updateAnswer(index, {
                        ...answers[index],
                        [opt]: e.target.checked
                      })
                    }
                  />
                  <label>{opt}</label>
                </div>
              ))}
              {q.hasOther && (
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      updateAnswer(index, {
                        ...answers[index],
                        Other: e.target.checked ? '' : null
                      })
                    }
                  />
                  <label>Other</label>
                  {answers[index]?.Other !== null && (
                    <input
                      type="text"
                      onChange={(e) =>
                        updateAnswer(index, {
                          ...answers[index],
                          Other: e.target.value
                        })
                      }
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {showModal && (
        <QuestionModal onClose={() => setShowModal(false)} onSave={addQuestion} />
      )}

      <button onClick={handleReview}>Review My Answers</button>
    </div>
  );
};

export default FormPage;
