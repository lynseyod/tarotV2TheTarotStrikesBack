// STRETCH GOALS
  // keep the card array
  // reasign the card to the past, present, future when clicked
  // display past, present, future cards when future is selected
//THOUGHTS
  // have the array of cards
  // on click, push that card to past/present/future etc

const theTarotStrikesBack = {};

// empty array of cards
// helps 'set' past, present, future cards based on clicks
theTarotStrikesBack.cardArray = [];

// returns an array of the whole deck in random order
// thank you tarot API for not making me write a randomize function
theTarotStrikesBack.setCards = function() {
  $.ajax({
    url: `http://proxy.hackeryou.com`,
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
    response.cards.forEach((card, index) => {
      $(`.card-container:nth-of-type(${index+1})`)
      .append(`<h2>${card.name}</h2>
        <p>${card.desc}</p>
        <p>${card.meaning_up}</p>`)
    })
  })
}

// event listener to select cards from the deck
theTarotStrikesBack.cardSelect = function() {
  $('.card-container').on("click", function() {
    if (theTarotStrikesBack.cardArray.length < 3) { // only want to select 3 cards!
      theTarotStrikesBack.cardArray.push($(this));
      $(this).addClass("clickedIt"); // to remove them from the stack
    } else { // if we've selected 3 cards, we show the results!
      // theTarotStrikesBack.displayCards();
      console.log("STOP CLICKING")
      console.log(theTarotStrikesBack.cardArray)
    }
  })
}

theTarotStrikesBack.init = function() {
  theTarotStrikesBack.setCards();
  theTarotStrikesBack.cardSelect();
}

document.addEventListener("DOMContentLoaded", function() {
  theTarotStrikesBack.init();
})