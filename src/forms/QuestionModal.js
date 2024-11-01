import React, { useState } from 'react';

const QuestionModal = ({ onClose, onSave }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('Paragraph');
  const [options, setOptions] = useState(['']);
  const [hasOther, setHasOther] = useState(false);

  const handleAddOption = () => setOptions([...options, '']);
  const handleOptionChange = (index, value) =>
    setOptions(
      options.map((opt, i) => (i === index ? value : opt))
    );

  const handleSubmit = () => {
    if (!text) return alert('Question text is required');
    if (type === 'CheckBox' && options.some((opt) => !opt))
      return alert('All options are required');

    onSave({ text, type, options, hasOther });
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add Question</h2>
      <label>Question Text</label>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

      <label>Answer Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Paragraph">Paragraph</option>
        <option value="CheckBox">CheckBox</option>
      </select>

      {type === 'CheckBox' && (
        <>
          <label>Options</label>
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
          <button onClick={handleAddOption}>Add Option</button>
          <label>
            <input
              type="checkbox"
              checked={hasOther}
              onChange={() => setHasOther(!hasOther)}
            />
            Include "Other" option
          </label>
        </>
      )}

      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default QuestionModal;
