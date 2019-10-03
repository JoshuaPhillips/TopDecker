import React from 'react';

import Card from '../../../Card/Card';
import FlipMove from 'react-flip-move';

import classes from './GalleryModeContainer.module.scss';

const GalleryModeContainer = props => {
  const { format, commander, mainDeckList, sideboardList, currentUserOwnsDeck, updateCardListHandler } = props;

  const maxMainDeckCards = format === 'commander' ? 99 : 60;

  let mainDeckTotal = 0;
  let sideboardTotal = 0;

  mainDeckList.map(({ mainDeckCount }) => {
    return (mainDeckTotal += mainDeckCount);
  });

  sideboardList.map(({ sideboardCount }) => {
    return (sideboardTotal += sideboardCount);
  });

  return (
    <div className={classes.GalleryModeContainer}>
      <h1>Main Deck</h1>
      <div className={classes.GalleryCardListContainer}>
        {mainDeckList.length === 0 && format !== 'commander' && <h1>No Cards Found</h1>}

        {format === 'commander' && (
          <div className={classes.DeckInspectorCommanderContainer}>
            <Card card={commander} />
          </div>
        )}
        <FlipMove typeName={null}>
          {mainDeckList.map(({ card, mainDeckCount, sideboardCount }) => {
            return (
              <div key={card.scryfall_id}>
                <Card card={card} />
                {format !== 'commander' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {currentUserOwnsDeck && (
                      <button
                        type='button'
                        disabled={mainDeckCount === 0}
                        onClick={() => updateCardListHandler(props.deck, 'mainDeck', 'remove', card)}
                        style={{ flexGrow: '1', flexBasis: '0' }}>
                        -
                      </button>
                    )}
                    <p style={{ flexGrow: '1', flexBasis: '0', textAlign: 'center' }}>{mainDeckCount}</p>
                    {currentUserOwnsDeck && (
                      <button
                        type='button'
                        disabled={mainDeckCount + sideboardCount === 4 || mainDeckTotal === maxMainDeckCards}
                        onClick={() => updateCardListHandler(props.deck, 'mainDeck', 'add', card)}
                        style={{ flexGrow: '1', flexBasis: '0' }}>
                        +
                      </button>
                    )}
                  </div>
                )}

                {currentUserOwnsDeck && (
                  <React.Fragment>
                    {format !== 'commander' && (
                      <button
                        type='button'
                        onClick={() => updateCardListHandler(props.deck, 'sideboard', 'transferToSideboard', card)}>
                        Transfer to Sideboard
                      </button>
                    )}

                    {format === 'commander' && (
                      <button
                        type='button'
                        onClick={() => updateCardListHandler(props.deck, 'mainDeck', 'delete', card)}>
                        Delete
                      </button>
                    )}
                  </React.Fragment>
                )}
              </div>
            );
          })}
        </FlipMove>
      </div>
      {format !== 'commander' && (
        <React.Fragment>
          <hr />
          <h1>Sideboard</h1>
          <div className={classes.GalleryCardListContainer}>
            {sideboardList.length === 0 ? (
              <h1>No Cards Found</h1>
            ) : (
              <FlipMove typeName={null} staggerDelayBy={20} staggerDurationBy={20}>
                {sideboardList.map(({ card, mainDeckCount, sideboardCount }) => {
                  return (
                    <div key={card.scryfall_id}>
                      <Card card={card} />
                      {format !== 'commander' && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          {currentUserOwnsDeck && (
                            <button
                              type='button'
                              disabled={sideboardCount === 0}
                              onClick={() => updateCardListHandler(props.deck, 'sideboard', 'remove', card)}
                              style={{ flexGrow: '1', flexBasis: '0' }}>
                              -
                            </button>
                          )}
                          <p style={{ flexGrow: '1', flexBasis: '0', textAlign: 'center' }}>{sideboardCount}</p>
                          {currentUserOwnsDeck && (
                            <button
                              type='button'
                              disabled={mainDeckCount + sideboardCount === 4 || sideboardTotal === 15}
                              onClick={() => updateCardListHandler(props.deck, 'sideboard', 'add', card)}
                              style={{ flexGrow: '1', flexBasis: '0' }}>
                              +
                            </button>
                          )}
                        </div>
                      )}

                      {currentUserOwnsDeck && (
                        <React.Fragment>
                          <button
                            type='button'
                            onClick={() => updateCardListHandler(props.deck, 'mainDeck', 'transferToMainDeck', card)}>
                            Transfer to Main Deck
                          </button>

                          <button
                            type='button'
                            onClick={() => updateCardListHandler(card, { mainDeckCount: 0, sideboardCount: 0 })}>
                            Delete
                          </button>
                        </React.Fragment>
                      )}
                    </div>
                  );
                })}
              </FlipMove>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default GalleryModeContainer;
