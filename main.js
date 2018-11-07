const cardsColor = ['darkred', 'darkred', 'darkred', 'gold', 'gold', 'gold', 'green', 'green', 'green', 'blue', 'blue', 'blue', 'purple', 'purple', 'purple', 'deeppink', 'deeppink', 'deeppink'];

let cards = document.querySelectorAll('div');
console.log(cards);
console.log(cards instanceof Array);
cards = [...cards];
console.log(cards);
console.log(cards instanceof Array);

const startTime = new Date().getTime();
//console.log(startTime);

let activeCard = '';
const activeCards = [];

const gameTriplet = cards.length / 3;
let gameResult = 0;

const clickCard = function () {
    //    console.log('click');
    activeCard = this;
    if (activeCard == activeCards[0]) return;
    if (activeCard == activeCards[1]) return;
    activeCard.classList.remove('hidden');

    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    }
    if (activeCards.length === 1) {
        activeCards[1] = activeCard;
        return;
    } else {
        cards.forEach(card => {
            card.removeEventListener('click', clickCard)

        })
        activeCards[2] = activeCard;
        setTimeout(function () {
            if ((activeCards[1].className === activeCards[2].className) && (activeCards[0].className === activeCards[2].className)) {
                console.log('wygrana');
                activeCards.forEach(card => card.classList.add('off'))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains('off'))
                if (gameResult == gameTriplet) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert(`Udało się! Twój wyni to ${gameTime} sekund`)
                    location.reload();
                    //                    console.log('Wygrana Gra!');
                }
            } else {
                console.log('przegrana');
                activeCards.forEach(card => card.classList.add('hidden'))
            }
            activeCard = '';
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener('click', clickCard))
        }, 1000)

    }
}


const init = function () {
    cards.forEach(function (card) {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position])
        cardsColor.splice(position, 1);
    })


    setTimeout(function () {
        cards.forEach(function (card) {
            card.classList.add('hidden')
            card.addEventListener('click', clickCard)
        })
    }, 2000)
}
init();

//console.log(card);
console.log(gameTriplet);
