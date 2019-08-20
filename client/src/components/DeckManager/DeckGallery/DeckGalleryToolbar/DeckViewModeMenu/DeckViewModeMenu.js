import React from 'react';

const DeckViewModeMenu = props => {
  return (
    <div>
      <p>View as:</p>
      <button type='button'>Gallery</button>
      <button type='button'>Text</button>
      <button type='button'>Stack</button>
      <button type='button'>List</button>
    </div>
  );
};

export default DeckViewModeMenu;
