const { gql } = require('apollo-server');

const QueryType = gql`
  type AuthResponse {
    currentUserId: String
    token: String
    expirationTime: String
  }

  enum Legality {
    legal
    restricted
    banned
  }

  input FormatSearch {
    format: Format!
    legality: Legality!
  }

  enum ColorSearchOptions {
    exactly
    including
    at_most
  }

  input ColorSearch {
    type: ColorSearchOptions!
    colors: [String]!
  }

  enum OracleSearchOptions {
    all
    exact
    any
  }

  input OracleTextSearch {
    type: OracleSearchOptions!
    text: String!
  }

  enum TypeLineSearchOptions {
    all
    any
  }

  input TypeLineSearch {
    type: TypeLineSearchOptions!
    text: String!
  }

  enum ComparisonOptions {
    less_than
    less_than_or_equal
    equal
    greater_than_or_equal
    greater_than
  }

  input PowerSearch {
    comparison: ComparisonOptions!
    value: String!
  }

  input ToughnessSearch {
    comparison: ComparisonOptions!
    value: String!
  }

  input LoyaltySearch {
    comparison: ComparisonOptions!
    value: String!
  }

  input CmcSearch {
    comparison: ComparisonOptions!
    value: String!
  }

  input SearchParamsInput {
    name: String
    oracle: OracleTextSearch
    type_line: TypeLineSearch
    colors: ColorSearch
    identity: ColorSearch
    commander: [String]
    mana_cost: String
    cmc: CmcSearch
    formats: [FormatSearch]
    set: [String]
    rarity: [Rarity]
    power: PowerSearch
    toughness: ToughnessSearch
    loyalty: LoyaltySearch
    is: [String]
  }

  type SearchResponse {
    cards: [Card!]!
    has_more: Boolean!
    next_page: String
    total_cards: Int!
  }

  type CardSummary {
    card: Card!
    mainDeckCount: Int!
    sideboardCount: Int!
  }

  type Query {
    test: String!

    login(email: String!, password: String!): AuthResponse!
    getCurrentUser: User!

    getAllDecks: [Deck!]!
    getDeckById(deckId: ID!): Deck!

    getRandomCard: Card!
    getCardByScryfallId(scryfallId: ID!): Card!

    searchCards(searchParams: SearchParamsInput, url: String): SearchResponse!

    getAllSets: [Set!]!
  }
`;

module.exports = QueryType;
