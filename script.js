// STRETCH GOALS
  // randomize upright and reversed cards
//THOUGHTS
  // have the array of cards
  // on click, push that card to past/present/future etc
  // the "stack" of cards is the shuffle button

const theTarotStrikesBack = {};

//empty array for our deck so we don't have to ping the API every time the user hits shuffle
theTarotStrikesBack.deck = [];

// empty array of cards
theTarotStrikesBack.selectedCards = [];

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

theTarotStrikesBack.displaySelectedCards = () => {
  console.log(theTarotStrikesBack.selectedCards);
  console.log(theTarotStrikesBack.deck)
  // $('main').append(`<div class="results"></div>`)
  // theTarotStrikesBack.selectedCards.forEach((card) => {
  //   $('.results').append(
  //     `<div class="card-container ${card.position}">
  //       ${card.cardHTML}
  //     </div>`
  //   )
  // })
}

theTarotStrikesBack.shuffle = () => {
  $('#shuffle').on("click", (event) => {
    event.preventDefault();
    // nothing should happen if we shuffle after we've selected our cards.
    if (theTarotStrikesBack.selectedCards.length < 3) {
      // first remove selected cards from the "shufflable" deck
      for (let i = 0; i < theTarotStrikesBack.cardsToSplice.length; i++) {
        const newDeck = theTarotStrikesBack.deck.filter((card) => {
          return card != theTarotStrikesBack.cardsToSplice[i];
        })
        theTarotStrikesBack.deck = newDeck;
      }
      // now take what we're left with and shuffle it.
      // FISHER YATES
      for (let i = theTarotStrikesBack.deck.length - 1; i > 0; i--) {
        const randomNum = Math.floor(Math.random() * (i + 1));
        const tempCard = theTarotStrikesBack.deck[i];
        theTarotStrikesBack.deck[i] = theTarotStrikesBack.deck[randomNum];
        theTarotStrikesBack.deck[randomNum] = tempCard;
      }
      theTarotStrikesBack.setCards(theTarotStrikesBack.deck);
      document.location.reload();
      // need to RELOAD. ugh where is react when I need it?
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