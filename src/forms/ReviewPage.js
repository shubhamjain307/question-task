import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const { state } = useLocation();
  const history = useNavigate();

  return (
    <div>
      <h1>Review My Answers</h1>
      {state?.answers && Object.keys(state?.answers).map((qIndex) => (
        <div key={qIndex}>
          <h3>Question {parseInt(qIndex) + 1}</h3>
          <p>
            {typeof state.answers[qIndex] === 'string'
              ? state.answers[qIndex]
              : Object.entries(state.answers[qIndex])
                  .filter(([, checked]) => checked)
                  .map(([opt]) => opt)
                  .join(', ')}
          </p>
        </div>
      ))}
      <button onClick={() => history('/')}>Back to Form</button>
    </div>
  );
};

export default ReviewPage;
