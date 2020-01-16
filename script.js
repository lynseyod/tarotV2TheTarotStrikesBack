// STRETCH GOALS
  // randomize upright and reversed cards
  // 'shuffle' function
    // DO IT WITHOUT PINGING THE API AGAIN?
//THOUGHTS
  // have the array of cards
  // on click, push that card to past/present/future etc

const theTarotStrikesBack = {};

//empty array for our deck so we don't have to ping the API every time the user hits shuffle
theTarotStrikesBack.deck = [];

// empty array of cards
// helps 'set' past, present, future cards based on clicks
theTarotStrikesBack.selectedCards = [
  {position: 'the-past'},
  {position: 'the-present'},
  {position: 'the-future'},
];

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
  $('main').append(`<div class="results"></div>`)
  theTarotStrikesBack.selectedCards.forEach((card) => {
    $('.results').append(
      `<div class="card-container ${card.position}">
        ${card.cardHTML}
      </div>`
    )
  })
}

theTarotStrikesBack.shuffle = () => {
  $('#shuffle').on("click", (event) => {
    event.preventDefault();

  })
}

// need to remove selected card from the 'deck' array
// so when we 'shuffle' it doesn't allow us to select the same card again.
// can I use the index to set a hidden attribute?

// event listener to select cards from the deck
theTarotStrikesBack.cardSelect = () => {
  let clicks = 0;
  $('.cards').on("click", ".card-container", function() {
    if (clicks <= 2) { // only want to select 3 cards!
      theTarotStrikesBack.selectedCards[clicks].cardHTML = ($(this)[0].innerHTML);
      $(this).addClass("clickedIt"); //remove them from the stack visually
      const thingIClicked = $(this);
      console.log(thingIClicked.attr()); // remove them from the array actually
      if (clicks === 2) {
        $('.card-container').unbind("click");
        theTarotStrikesBack.displaySelectedCards();
      }
    }
    clicks++;
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