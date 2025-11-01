import React from 'react';

const InputField = ({ label, id, name, type = 'text', value, onChange, error, ...rest }) => {
  const inputStyle = { 
    padding: '8px', 
    width: '100%', 
    boxSizing: 'border-box',
    border: error ? '2px solid red' : '1px solid #ccc' 
  };
  const errorStyle = { color: 'red', fontSize: '0.8em', marginTop: '4px' };
  const groupStyle = { marginBottom: '15px' };

  return (
    <div style={groupStyle}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
        {...rest}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default InputField;