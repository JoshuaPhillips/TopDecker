import React, { useState } from "react";
import { toast } from "react-toastify";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_DECK_LIST, DELETE_DECK } from "./graphql";
import { GET_AUTH_DATA } from "../../graphql";

import DeckListItem from "./DeckListItem";
import AddDeckForm from "./AddDeckForm";
import Spinner from "../Spinner";

import {
  DeckListContainer,
  DeckList,
  DeckListSubSectionHeader
} from "./styles";
import { Button } from "../../shared/Buttons";
import { SectionHeader } from "../../shared/Headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClone } from "@fortawesome/free-solid-svg-icons";

const Decks = () => {
  const [addingDeck, toggleAddingDeck] = useState(false);
  const [deckList, setDeckList] = useState([]);

  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, {
    fetchPolicy: "cache-only"
  });

  const { currentUserId } = GetAuthDataQueryResponse.data.AuthData;

  const GetDeckListQueryResponse = useQuery(GET_DECK_LIST, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      if (data) {
        const deckList = data.getAllDecks.sort((a, b) => {
          if (a.format.toLowerCase() < b.format.toLowerCase()) {
            return -1;
          }

          if (a.format.toLowerCase() > b.format.toLowerCase()) {
            return 1;
          }

          if (a.name < b.name) {
            return -1;
          }

          if (a.name > b.name) {
            return 1;
          }

          return 0;
        });
        setDeckList(deckList);
      }
    }
  });

  const [DeleteDeckMutation] = useMutation(DELETE_DECK, {
    refetchQueries: [{ query: GET_DECK_LIST }],

    onCompleted(data) {
      if (data) {
        const { deleteDeck: deletedDeckId } = data;
        const newDeckList = deckList.filter(deck => {
          return deck.id !== deletedDeckId;
        });
        setDeckList(newDeckList);
        toast.info("Deck deleted.");
      }
    }
  });

  const deleteDeck = deckId => {
    DeleteDeckMutation({
      variables: { deckId: deckId }
    });
  };

  const currentUserDecks = deckList.filter(deck => {
    return deck.owner.id === currentUserId;
  });

  const otherDecks = deckList.filter(deck => {
    return deck.owner.id !== currentUserId;
  });

  if (GetDeckListQueryResponse.loading) {
    return <Spinner />;
  }

  return (
    <DeckListContainer>
      <SectionHeader>
        <FontAwesomeIcon icon={faClone} fixedWidth />
        Your Decks
      </SectionHeader>

      <DeckList>
        {GetDeckListQueryResponse.errors &&
          toast.error("Sorry there was an error loading your deck list.")}
        {currentUserDecks.length === 0 ? (
          <DeckListSubSectionHeader>No Decks Found</DeckListSubSectionHeader>
        ) : (
          currentUserDecks.map(deck => {
            return (
              <DeckListItem
                deck={deck}
                key={deck.id}
                currentUserId={currentUserId}
                deleteDeckHandler={deleteDeck}
              />
            );
          })
        )}

        {!addingDeck ? (
          <Button type="button" onClick={() => toggleAddingDeck(true)}>
            <FontAwesomeIcon icon={faPlus} fixedWidth />
            Add Deck
          </Button>
        ) : (
          <AddDeckForm cancelAddDeckHandler={() => toggleAddingDeck(false)} />
        )}
      </DeckList>

      <SectionHeader>
        <FontAwesomeIcon icon={faClone} fixedWidth />
        Other People's Decks
      </SectionHeader>

      <DeckList>
        {otherDecks.length === 0 ? (
          <DeckListSubSectionHeader>No Decks Found</DeckListSubSectionHeader>
        ) : (
          otherDecks.map(deck => {
            return (
              <DeckListItem
                deck={deck}
                key={deck.id}
                currentUserId={currentUserId}
              />
            );
          })
        )}
      </DeckList>
    </DeckListContainer>
  );
};

export default Decks;
