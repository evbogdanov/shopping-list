import React from 'react';

import { StyledInput } from './styled';

const Input = props => {
  return <StyledInput {...props} autoComplete="off" />;
};

export default Input;
