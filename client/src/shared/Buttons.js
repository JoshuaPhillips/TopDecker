import styled from "styled-components";

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const Button = styled.button`
  border: 2px solid ${props => props.theme.colors.primary}
  background-color: ${props =>
    props.inverted ? "inherit" : props.theme.colors.primary}
  color: ${props =>
    props.inverted ? props.theme.colors.primary : props.theme.colors.background}
  padding: 0.5rem;
  
  border-radius: 3px;
  
  transition: .2s all ease-in-out;

  &:hover {
    background-color: ${props =>
      props.inverted
        ? props.theme.colors.primary
        : props.theme.colors.background}
        
    color: ${props =>
      props.inverted
        ? props.theme.colors.background
        : props.theme.colors.primary}
  }

  &:disabled {
    background-color: lightgrey;
    border: 2px solid lightslategrey;
    color: lightslategrey;
  }

  &:disabled:hover {
    background-color: lightgrey;
    color: lightslategrey;
    
  }
  
  svg {
    margin-right: .25rem;
  }
`;

export const DangerButton = styled(Button)`
  border: 2px solid ${props => props.theme.colors.danger}
  background-color: ${props =>
    props.inverted ? props.theme.colors.danger : "inherit"}
  
  color: ${props =>
    props.inverted ? props.theme.colors.background : props.theme.colors.danger}
  

  &:hover {
    background-color: ${props =>
      props.inverted
        ? props.theme.colors.background
        : props.theme.colors.danger}
    color: ${props =>
      props.inverted
        ? props.theme.colors.danger
        : props.theme.colors.background}
  }
`;
