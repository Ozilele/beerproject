import React, { useState } from 'react';

const useInput = (validateFunc) => {
  
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFunc(enteredValue); // checking if the value in input is valid
  const hasError = isTouched && !isValid;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  }

  const blurChangeHandler = () => {
    setIsTouched(true);
  }

  return {
    value: enteredValue,
    isValid: isValid,
    hasError: hasError,
    onChange: valueChangeHandler,
    onBlur: blurChangeHandler,
  }
}

export default useInput;