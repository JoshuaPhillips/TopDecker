import styled from "styled-components";

export const StyledSearchResultTextItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: ${props => props.theme.borders.standard}
  border-top: 3px solid #385170;
  border-bottom: ${props => props.theme.borders.thick};
  border-radius: 5px;

  width: calc((100% - 1rem) / 3);

  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  :nth-child(3n) {
    margin-right: 0;
  }
`;

export const TextModeCardItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid lightgrey;
  margin-top: 2rem;
  border-top: 2px solid #385170;
  border-radius: 5px 5px 0 0;

  &:first-child {
    margin-top: 0;
    border-top: none;
  }

  p {
    font-weight: bold;
    min-width: 40%;
    border: none;
    padding: none;

    &:last-child {
      text-align: right;
    }
  }
`;

export const TextModeCardItemContent = styled.div`
  border-radius: 0 0 5px 5px;

  div {
    padding: 0.5rem;
    border-bottom: 1px solid lightgrey;

    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const TextModeCardItemOracleText = styled.div`
  p {
    margin-bottom: 1rem;
    line-height: 150%;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const TextModeCardItemFlavorText = styled.div`
  margin-top: auto;
  p {
    font-style: italic;
    line-height: 150%;
  }
`;

export const SearchResultCardControlsWrapper = styled.div`
  margin: auto 0 0.5rem;
`;
