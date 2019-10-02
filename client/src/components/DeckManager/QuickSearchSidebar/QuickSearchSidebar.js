import React, { useState } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { SEARCH_CARDS } from './graphql';

import QuickSearchResult from './QuickSearchResult/QuickSearchResult';

const AddCardSidebar = props => {
  const {
    deck: { cardList, commander, format }
  } = props;

  const client = useApolloClient();

  const [searchResults, setSearchResults] = useState([]);
  const [selectedList, setSelectedList] = useState('mainDeck');
  const [nameSearch, setNameSearch] = useState('');

  const searchCards = async submitEvent => {
    submitEvent.preventDefault();
    const { data } = await client.query({
      query: SEARCH_CARDS,
      skip: nameSearch.length < 3,
      variables: {
        searchParams: {
          name: nameSearch,
          ...defaultParams
        }
      }
    });
    setSearchResults(data.searchCards.cards);
  };

  const isCardSelectable = resultCard => {
    const maxCardAllowance = format === 'commander' ? 1 : 4;

    const matchedCard = cardList.findIndex(({ card }) => {
      return card.scryfall_id === resultCard.scryfall_id;
    });

    if (format === 'commander' && resultCard.scryfall_id === commander.scryfall_id) {
      return false;
    }

    if (format === 'commander' && selectedList === 'sideboard') {
      return false;
    }

    if (matchedCard === -1) {
      return true;
    }

    const { mainDeckCount, sideboardCount } = cardList[matchedCard];
    if (mainDeckCount + sideboardCount >= maxCardAllowance) {
      return false;
    }

    return true;
  };

  const addCardHandler = card => {
    props.updateCardListHandler(props.deck, selectedList, 'add', card);
  };

  const defaultParams = {
    formats: [
      {
        format: format,
        legality: 'legal'
      }
    ]
  };

  if (format === 'commander') {
    defaultParams.commander = commander.color_identity;
  }

  return (
    <div style={{ width: '15%', overflowX: 'scroll' }}>
      <h1>Quick Search</h1>
      {format !== 'commander' && (
        <React.Fragment>
          <button type='button' disabled={selectedList === 'mainDeck'} onClick={() => setSelectedList('mainDeck')}>
            Main Deck
          </button>
          <button type='button' disabled={selectedList === 'sideboard'} onClick={() => setSelectedList('sideboard')}>
            Sideboard
          </button>
        </React.Fragment>
      )}
      <div>
        {searchResults.length !== 0 && (
          <React.Fragment>
            {searchResults.map(result => {
              return (
                <QuickSearchResult
                  key={result.scryfall_id}
                  card={result}
                  isSelectable={isCardSelectable(result)}
                  addCardHandler={addCardHandler}
                />
              );
            })}
            <button
              type='button'
              onClick={() => {
                setSearchResults([]);
              }}>
              Clear Results
            </button>
          </React.Fragment>
        )}
      </div>
      <form onSubmit={searchCards}>
        <input
          type='text'
          placeholder='Card Name...'
          value={nameSearch}
          onChange={e => setNameSearch(e.target.value)}
        />

        <button type='submit' disabled={nameSearch.length < 3}>
          Search
        </button>
      </form>
      {/* <button
        type='button'
        disabled={
          !selectedCard || matchedCardCounts.mainDeckCount + matchedCardCounts.sideboardCount === maxCardAllowance
        }
        onClick={() => {
          props.updateCardListHandler(props.deck, 'mainDeck', 'add', selectedCard);
        }}>
        Add Card
      </button>

      {format !== 'commander' && (
        <button
          type='button'
          disabled={
            !selectedCard || matchedCardCounts.mainDeckCount + matchedCardCounts.sideboardCount === maxCardAllowance
          }
          onClick={() => {
            props.updateCardListHandler(props.deck, 'sideboard', 'add', selectedCard);
          }}>
          Add Card to Sideboard
        </button>
      )} */}
    </div>
  );
};

export default AddCardSidebar;
