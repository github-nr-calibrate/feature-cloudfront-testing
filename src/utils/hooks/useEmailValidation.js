import { useState } from 'react';

const useEmailValidation = () => {
  const EMAIL_VALIDITY_INITIAL_STATE = 'initial';
  const [isEmailValid, setEmailValidity] = useState(EMAIL_VALIDITY_INITIAL_STATE);

  const handleInputChange = (e) => {
    const emailRegex = /[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+\.[a-zA-Z0-9-]{2,}/;
    setEmailValidity(emailRegex.test(e.target.value));
  };

  return [isEmailValid, handleInputChange];
};

export default useEmailValidation;
