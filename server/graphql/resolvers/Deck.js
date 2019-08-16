const { ApolloError } = require('apollo-server');
const axios = require('axios');

const User = require('../../database/models/User');
const filterCardData = require('../utils/filterCardData');

const DeckResolvers = {
  Deck: {
    owner: async parent => {
      try {
        const matchedUser = await User.findById(parent.owner);

        if (!matchedUser) {
          throw new ApolloError(`User could not be found with ID ${parent.owner}`, 'USER_NOT_FOUND');
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
            throw new ApolloError('Card could not be found.', 'CARD_NOT_FOUND');
          }

          return {
            ...filterCardData(matchedCard.data)
          };
        }

        const matchedCard = await axios.get(`https://api.scryfall.com/cards/84dd3586-7c3b-4f9c-a1eb-7745b75339b0`);

        if (!matchedCard) {
          throw new ApolloError('Card could not be found.', 'CARD_NOT_FOUND');
        }

        return {
          ...filterCardData(matchedCard.data)
        };
      } catch (error) {
        return error;
      }
    },

    comments: async parent => {
      try {
        const matchedComments = await Comment.find({ relatedDeck: parent._id });

        if (!matchedComments) {
          throw new ApolloError(`No comments were found for deck with ID ${parent._id}`, 'COMMENTS_NOT_FOUND');
        }

        return matchedComments;
      } catch (error) {
        return error;
      }
    }
  }
};

module.exports = DeckResolvers;
