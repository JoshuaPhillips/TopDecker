import gql from 'graphql-tag';

export const GET_DECK_DETAILS = gql`
  query GetDeckDetails($deckId: ID!) {
    getDeckById(deckId: $deckId) {
      id
      name
      format
      commander {
        name
      }
      cardList {
        card {
          scryfall_id
          name
          layout
          image_uris {
            large
          }
          card_faces {
            image_uris {
              large
            }
          }
        }
      }
    }
  }
`;

export const ADD_CARD_TO_DECK = gql`
  mutation AddCardToDeck($deckId: ID!, $cardScryfallId: ID!) {
    addCardToDeck(deckId: $deckId, cardScryfallId: $cardScryfallId) {
      scryfallId
      quantity
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($deckId: ID!, $scryfallId: ID!) {
    deleteCard(deckId: $deckId, scryfallId: $scryfallId)
  }
`;
