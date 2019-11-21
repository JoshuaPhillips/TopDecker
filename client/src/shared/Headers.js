import styled from "styled-components";

export const SectionHeader = styled.h1`
  text-transform: uppercase;
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  color: ${props =>
    props.danger ? props.theme.colors.fireBrick : props.theme.colors.deepBlue};
  border-bottom: 3px solid
    ${props =>
      props.danger
        ? props.theme.colors.fireBrick
        : props.theme.colors.deepBlue};
  font-size: ${props => props.theme.fonts.sizes.extraLarge};
  font-weight: ${props => props.theme.fonts.weights.bold};

  svg {
    margin-right: 0.5rem;
  }
`;

export const SubSectionHeader = styled.h2`
  font-size: ${props => props.theme.fonts.sizes.large};
  width: 100%;
  font-weight: ${props => props.theme.fonts.weights.bold};
`;
