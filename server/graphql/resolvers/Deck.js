const { ApolloError } = require("apollo-server");
const axios = require("axios");

const User = require("../../database/models/User");
const filterCardData = require("../utils/filterCardData");

const DeckResolvers = {
  Deck: {
    owner: async parent => {
      try {
        const matchedUser = await User.findById(parent.owner);

        if (!matchedUser) {
          throw new ApolloError(`User could not be found with ID ${parent.owner}`, "USER_NOT_FOUND");
        }

        return { ...matchedUser._doc, id: matchedUser._doc._id };
      } catch (error) {
        return error;
      }
    },

    commander: async parent => {
      try {
        const { commander } = parent;

        if (commander) {
          const matchedCard = await axios.get(`https://api.scryfall.com/cards/${commander}`);

          if (!matchedCard) {
            throw new ApolloError("Card could not be found.", "CARD_NOT_FOUND");
          }

          return {
            ...filterCardData(matchedCard.data)
          };
        }

        return null;
      } catch (error) {
        return error;
      }
    },

    cardList: async parent => {
      try {
        const { cardList } = parent;

        const populateCards = async cardList => {
          // cardList.map will return an array of Promises here, so we need to wait for them all to resolve before we can
          // use the result of map.
          const populatedCards = await Promise.all(
            cardList.map(async card => {
              const matchedCard = await axios.get(`https://api.scryfall.com/cards/${card.scryfallId}`);

              return {
                card: filterCardData(matchedCard.data),
                mainDeckCount: card.mainDeckCount,
                sideboardCount: card.sideboardCount
              };
            })
          );

          return populatedCards;
        };

        const response = await populateCards(cardList);

        return response;
      } catch (error) {
        return error;
      }
    },

    comments: async parent => {
      try {
        const matchedComments = await Comment.find({ relatedDeck: parent._id });

        if (!matchedComments) {
          throw new ApolloError(`No comments were found for deck with ID ${parent._id}`, "COMMENTS_NOT_FOUND");
        }

        return matchedComments;
      } catch (error) {
        return error;
      }
    }
  }
};

module.exports = DeckResolvers;
