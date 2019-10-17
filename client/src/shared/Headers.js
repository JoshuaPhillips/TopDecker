import styled from 'styled-components';

export const SectionHeader = styled.h1`
  text-transform: uppercase;
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  color: ${props => (props.danger ? props.theme.colors.danger : props.theme.colors.primary)};
  border-bottom: 3px solid ${props => (props.danger ? props.theme.colors.danger : props.theme.colors.primary)};
  font-size: ${props => props.theme.fonts.sizes.extraLarge};
  font-weight: ${props => props.theme.fonts.weights.bold};
`;

export const SubSectionHeader = styled.h1`
  font-size: ${props => props.theme.fonts.sizes.large};
  width: 100%;
  margin: 0 0 2rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
`;
