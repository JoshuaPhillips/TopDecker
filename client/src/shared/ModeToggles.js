import styled from "styled-components";

export const ModeToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;


  button {
    flex-grow: 1;
    flex-basis: 0;
    padding: 0.25rem 0.5rem;
    border: 2px solid ${props => props.theme.colors.deepBlue};
    border-right: 0;
    color: ${props => props.theme.colors.deepBlue};

    &:disabled {
      background-color: ${props => props.theme.colors.deepBlue};
      color: ${props => props.theme.colors.whiteSmoke};
    }

    &:first-child {
      border-radius: 5px 0 0 5px;
    }

    &:last-child {
      border-right: 2px solid ${props => props.theme.colors.deepBlue}
      border-radius: 0 5px 5px 0;
    }
  }
`;
