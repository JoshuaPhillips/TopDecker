import React from 'react';

import Card from '../../../Card/Card';

const DeckGalleryCardList = props => {
  const {
    deck: { cardList, format },
    deleteMode
  } = props;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {cardList.length !== 0 &&
        cardList.map(({ card, quantity }) => {
          return (
            <div key={card.scryfall_id} style={{ width: 'calc(25% - 1rem)', maxWidth: '20vw', margin: '.5rem' }}>
              <Card
                card={card}
                changeCardQuantity={props.changeCardQuantity}
                quantity={quantity}
                withQuantityIndicator={format === 'commander' ? false : true}
              />
              {deleteMode && (
                <button type='button' onClick={() => props.deleteCardHandler(card.scryfall_id)}>
                  Delete
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default DeckGalleryCardList;
