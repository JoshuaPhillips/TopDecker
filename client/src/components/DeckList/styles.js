import styled from 'styled-components';

export const DeckListContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 4rem auto;
  padding: 3rem;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 7px #c7c7c7;
  width: 50%;
  border-radius: 5px;
`;

export const DeckList = styled.div`
  margin: 0 auto 2rem;
  width: 80%;

  ButtonGroup {
    color: red;
  }
`;
