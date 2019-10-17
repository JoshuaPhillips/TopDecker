import styled from 'styled-components';
import { Mana } from '@saeris/react-mana';

export const StyledDeckInspectorToolbar = styled.div.attrs(props => ({ disabled: props.disabled }))`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .DeckInspectorToolbarHeader {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid ${props => props.theme.colors.primary};

    h1 {
      text-transform: uppercase;
      color: ${props => (props.danger ? props.theme.colors.danger : props.theme.colors.primary)};
      font-size: ${props => props.theme.fonts.sizes.extraLarge};
      font-weight: ${props => props.theme.fonts.weights.bold};
    }

    p {
      font-weight: ${props => props.theme.fonts.weights.bold};
    }

    button {
      margin: 0 0 0 0.5rem;
    }
  }

  .DeckInspectorToolbarControls {
    display: flex;
    flex-wrap: no-wrap;
    justify-content: space-between;
    padding-top: 0.5rem;
    width: 100%;
  }
`;

export const CardTypeFilterIcon = styled(Mana)`
  margin: 0 0.25rem;
  cursor: pointer;

  color: ${props => (props.disabled ? 'lightgrey' : props.theme.colors.primary)};
`;
