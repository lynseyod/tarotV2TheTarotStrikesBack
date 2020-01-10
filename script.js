// STRETCH GOALS
  // keep the card array
  // reasign the card to the past, present, future when clicked
  // display past, present, future cards when future is selected
//THOUGHTS
  // have the array of cards
  // on click, push that card to past/present/future etc

const theTarotStrikesBack = {};

// api call for 78 random tarot cards
// returns an array of the whole deck in random order
// thank you tarot API for not making me write this function.
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
    response.cards.forEach((card, index) => {
      console.log(card)
      $(`.card-container:nth-of-type(${index+1})`)
      .append(`<h2>${card.name}</h2>
        <p>${card.desc}</p>
        <p>${card.meaning_up}</p>`)
    })
  })
}

theTarotStrikesBack.cardSelect = function() {
  $('.card-container').on("click", function() {
    if ($('.the-past').length === 0) {
      $(this).addClass('the-past');
    } else if ($('.the-present').length === 0) {
      $(this).addClass('the-present');
    } else if ($('.the-future').length === 0) {
      $(this).addClass('the-future');
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