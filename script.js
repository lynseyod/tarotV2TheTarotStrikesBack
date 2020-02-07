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
  console.log(theTarotStrikesBack.selectedCards)
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

  })
}

// need to remove selected card from the 'deck' array
// so when we 'shuffle' it doesn't allow us to select the same card again.
// can I use the index to set a hidden attribute?
// can I slice/splice to actually REMOVE it from the deck?

// event listener to select cards from the deck
theTarotStrikesBack.cardSelect = () => {
  $('.cards').on("click", ".card-container", function() {
    if (theTarotStrikesBack.selectedCards.length < 3) { //need to get to 3 cards
      // I need the index of the card I clicked (number attr)
      // I need to slice (splice?!) out the card from the original deck...
      const indexOfCardIClicked = $(this).attr("number");
      console.log(indexOfCardIClicked)
      theTarotStrikesBack.selectedCards.push($(this))
      $(this).addClass("clickedIt") //remove from the stack visually
      
      if (theTarotStrikesBack.selectedCards.length == 3) {
        $('.card-container').unbind("click");
        theTarotStrikesBack.displaySelectedCards();
      }
    }
  })
}

theTarotStrikesBack.init = () => {
  theTarotStrikesBack.getCards();
  // theTarotStrikesBack.shuffle();
  theTarotStrikesBack.cardSelect();
}

document.addEventListener("DOMContentLoaded", () => {
  theTarotStrikesBack.init();
})