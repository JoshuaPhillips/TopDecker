import gql from 'graphql-tag';

export const GET_DECK_DETAILS = gql`
  query GetDeckDetails($deckId: ID!) {
    getDeckById(deckId: $deckId) {
      id
      name
      format
      commander {
        name
        scryfall_id
        color_identity
        mana_cost
        type_line
        rarity
        layout
        set
        collector_number
        power
        toughness
        loyalty
        oracle_text
        flavor_text
        image_uris {
          art_crop
          large
        }
        card_faces {
          image_uris {
            large
          }
        }
      }
      cardList {
        card {
          scryfall_id
          name
          type_line
          colors
          mana_cost
          rarity
          layout
          set
          collector_number
          cmc
          power
          toughness
          loyalty
          oracle_text
          flavor_text
          image_uris {
            large
          }
          card_faces {
            name
            type_line
            mana_cost
            oracle_text
            flavor_text
            power
            toughness
            loyalty
            image_uris {
              large
            }
          }
        }
        mainDeckCount
        sideboardCount
      }
      owner {
        id
      }
    }
  }
`;

export const UPDATE_CARD_LIST = gql`
  mutation UpdateCardList($deckId: ID!, $cardList: [CardSummaryInput!]!) {
    updateCardList(deckId: $deckId, cardList: $cardList)
  }
`;

export const GET_AUTH_DATA = gql`
  query GetAuthData {
    AuthData @client {
      token
      currentUserId
    }
  }
`;
