// STRETCH GOALS
  // randomize upright and reversed cards
  // more complex spreads
//THOUGHTS
  // 'selected cards' are pushing as an array of arrays of single objects.
    // is there a way to make this one step instead of two?
  // my shuffle feature currently checks for 3 selected cards
    // we should remove the button altogether when 3 cards are selected.

// WHERE I LEFT OFF
  // can I push a "position" property?
  // can I add a class that only appears on selected cards?
  // new array of "positions"
    // use value of 'click' to assign position[click] to selected cards

const theTarotStrikesBack = {};

//empty array for our deck so we don't have to ping the API every time the user hits shuffle
theTarotStrikesBack.deck = [];

// empty array of cards
theTarotStrikesBack.selectedCards = [];

//array of positions to add to selected cards
theTarotStrikesBack.positions = ["the-past","the-present","the-future",]

// empty array of cards to SPLICE on shuffle
// only used when "shuffle" button is clicked.
theTarotStrikesBack.cardsToSplice = [];

theTarotStrikesBack.clicks = 0 // clicks cannot reset even if cards are shuffled.

// returns an array of the whole deck in random order
// thank you tarot API for not making me write a randomize function
theTarotStrikesBack.getCards = () => {
  $.ajax({
    url: `https://proxy.hackeryou.com`,
    method: `GET`,
    dataType: `json`,
    data: {
      reqUrl: `https://rws-cards-api.herokuapp.com/api/v1/cards/random`,
      params: {
        n: 78
      }
    }
  }).then((response) => {
    // setting the cards in the deck
    // I want to do this BEFORE people click so they can feel out the deck
    // I'm aware it's fake but... I WANT TO BELIEVE
    response.cards.forEach((card) => {
      theTarotStrikesBack.deck.push(card)
    })
    theTarotStrikesBack.setCards(theTarotStrikesBack.deck)
  })
}

theTarotStrikesBack.setCards = (cards) => {
  $('.cards').html('');
  cards.forEach((card, index) => {
    $('.cards').append(
      `<button number="${index}" class="card-container">
        <h2>${card.name}</h2>
        <p>${card.desc}</p>
        <p>${card.meaning_up}</p>
      </button>`
    )
  })
}

theTarotStrikesBack.setPositions = () => {
  for (let i = 0; i <= theTarotStrikesBack.positions.length; i++) {
    $(`.card-container:nth-of-type(${i + 1})`).addClass(`${theTarotStrikesBack.positions[i]}`);
  }
}

theTarotStrikesBack.displaySelectedCards = () => {
  const cardsFromSelectedCards = [];
  theTarotStrikesBack.selectedCards.forEach((card) => {
    cardsFromSelectedCards.push(card[0]);
  })
  theTarotStrikesBack.setCards(cardsFromSelectedCards);
  theTarotStrikesBack.setPositions();
}

theTarotStrikesBack.shuffle = () => {
  $('#shuffle').on("click", (event) => {
    event.preventDefault();
    // nothing should happen if we shuffle after we've selected our cards.
    if (theTarotStrikesBack.selectedCards.length < 3) {
      // first remove selected cards from the "shufflable" deck
      // splicing the first card CHANGES THE CARDS.
      // can I filter the deck and check if the card is ANY of the selected values?
      for (let i = 0; i < theTarotStrikesBack.cardsToSplice.length; i++) {
        const newDeck = theTarotStrikesBack.deck.filter((card) => {
          // check if it appears in cardsToSplice AT ALL.
          let shouldIKeepIt = true;
          theTarotStrikesBack.cardsToSplice.forEach((cardToSplice) => {
            if (cardToSplice == card) {
              shouldIKeepIt = false;
            }
          })
          return shouldIKeepIt;
        })
        theTarotStrikesBack.deck = newDeck;
      }
      // now take what we're left with and shuffle it.
      // FISHER YATES algorithm!!
      for (let i = theTarotStrikesBack.deck.length - 1; i > 0; i--) {
        const randomNum = Math.floor(Math.random() * (i + 1));
        const tempCard = theTarotStrikesBack.deck[i];
        theTarotStrikesBack.deck[i] = theTarotStrikesBack.deck[randomNum];
        theTarotStrikesBack.deck[randomNum] = tempCard;
      }
      theTarotStrikesBack.setCards(theTarotStrikesBack.deck);
    }
  })
}

// event listener to select cards from the deck
theTarotStrikesBack.cardSelect = () => {
  $('.cards').on("click", ".card-container", function() {
    if (theTarotStrikesBack.selectedCards.length < 3) { //need to get to 3 cards
      // I need the index of the card I clicked (number attr)
      // I need to slice (splice?!) out the card from the original deck...
      // ASK ME HOW MUCH I BANGED MY HEAD ON THE COUNTER BEFORE I REALIZED IT WAS RETURNING A STRING INSTEAD OF A NUMBER
      // Don't though. The memory is too painful.
      const indexOfCardIClicked = parseInt($(this).attr("number"));
      const newCard = theTarotStrikesBack.deck.slice(indexOfCardIClicked, indexOfCardIClicked + 1);
      theTarotStrikesBack.selectedCards.push(newCard);
      theTarotStrikesBack.cardsToSplice.push(theTarotStrikesBack.deck[indexOfCardIClicked]);
      $(this).addClass("clickedIt") //remove from the stack visually
      if (theTarotStrikesBack.selectedCards.length == 3) { //when we've selected 3, FINISH
        $('.card-container').unbind("click");
        theTarotStrikesBack.displaySelectedCards();
      }
    }
  })
}

theTarotStrikesBack.init = () => {
  theTarotStrikesBack.getCards();
  theTarotStrikesBack.shuffle();
  theTarotStrikesBack.cardSelect();
}

document.addEventListener("DOMContentLoaded", () => {
  theTarotStrikesBack.init();
})