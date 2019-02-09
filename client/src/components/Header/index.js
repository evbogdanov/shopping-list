import React from 'react';
import { NavLink } from 'react-router-dom';

import { StyledHeader, StyledLink } from './styled';

const Header = () => {
  return (
    <StyledHeader>
      <StyledLink as={NavLink} exact to="/">
        Shopping list
      </StyledLink>
      <StyledLink as={NavLink} to="/new">
        New item
      </StyledLink>
    </StyledHeader>
  );
};

export default Header;
