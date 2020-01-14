// STRETCH GOALS
  // randomize upright and reversed cards
  // 'shuffle' function
    // DO IT WITHOUT PINGING THE API AGAIN?
//THOUGHTS
  // have the array of cards
  // on click, push that card to past/present/future etc

  //have card array:
  // [{selection: 'the past'}, {selection: 'the present'}, {selection: 'the future'}]
  // for (i = 0; i <= 2; ++i) {
    // cardArray[i].card = whateverTheCardIs
  // }

const theTarotStrikesBack = {};

// empty array of cards
// helps 'set' past, present, future cards based on clicks
theTarotStrikesBack.cardArray = [
  {
    position: 'the-past'
  },
  {
    position: 'the-present'
  },
  {
    position: 'the-future'
  },
];

// returns an array of the whole deck in random order
// thank you tarot API for not making me write a randomize function
theTarotStrikesBack.setCards = () => {
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
    // I'm aware it's fake but... I WANT TO BELIEVE
    response.cards.forEach((card, index) => {
      $(`.card-container:nth-of-type(${index+1})`)
      .append(`<h2>${card.name}</h2>
        <p>${card.desc}</p>
        <p>${card.meaning_up}</p>`)
    })
  })
}

theTarotStrikesBack.displayCards = () => {
  theTarotStrikesBack.cardArray.forEach((card) => {
    $('footer').append(
      `<div class=${card.position}>
        ${card.cardHTML}
      </div>`
    )
  })
}

// event listener to select cards from the deck
theTarotStrikesBack.cardSelect = () => {
  let clicks = 0;
  $('.card-container').on("click", function() {
    if (clicks <= 2) { // only want to select 3 cards!
      theTarotStrikesBack.cardArray[clicks].cardHTML = ($(this)[0].innerHTML);
      $(this).addClass("clickedIt"); //remove them from the stack
      if (clicks === 2) {
        $('.card-container').unbind("click");
        console.log(theTarotStrikesBack.cardArray)
        theTarotStrikesBack.displayCards();
      }
    }
    clicks++;
  })
}

theTarotStrikesBack.init = () => {
  theTarotStrikesBack.setCards();
  theTarotStrikesBack.cardSelect();
}

document.addEventListener("DOMContentLoaded", () => {
  theTarotStrikesBack.init();
})