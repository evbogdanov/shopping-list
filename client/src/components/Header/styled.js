import styled from 'styled-components';

export const StyledHeader = styled.header`
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

export const StyledLink = styled.span`
  margin: 0 10px;
  color: blue;
  text-decoration: none;
  cursor: pointer;
  &:not(.active):hover {
    text-decoration: underline;
  }
  &.active {
    color: black;
    font-weight: bold;
    cursor: default;
  }
`;
