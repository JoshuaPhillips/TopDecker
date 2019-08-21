import gql from 'graphql-tag';

export const GET_USER_DECKS = gql`
  query GetUserDecks {
    getCurrentUser {
      decks {
        id
        name
        format
        cardList {
          mainDeckCount
          sideboardCount
        }
      }
    }
  }
`;
