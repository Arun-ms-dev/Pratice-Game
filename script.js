'use strict';
const scoreElement1 = document.querySelector('#score--0');
const currentElement1 = document.querySelector('#current--0');
const scoreElement2 = document.querySelector('#score--1');
const currentElement2 = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnDiceRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');

// help
const btnHelp = document.querySelector('.help');

let score, currentScore, activePlayer, playing;
// starting
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreElement1.textContent = 0;
  scoreElement2.textContent = 0;
  currentElement1.textContent = 0;
  currentElement2.textContent = 0;

  diceElement.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player2El.classList.remove('player--active');
  player1El.classList.add('player--active');
};
init();
// function switching player

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player2El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//dice roll ()

btnDiceRoll.addEventListener('click', function () {
  if (playing) {
    const diceRoll = Number(Math.trunc(Math.random() * 6) + 1);
    diceElement.classList.remove('hidden');
    diceElement.src = `images/dice-${diceRoll}.png`;

    //store
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// help section

btnHelp.addEventListener('click', function () {
  document.querySelector('.text').classList.remove('helpHide');
  document.querySelector('.overlay').classList.remove('helpHide');
});
document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.overlay').classList.add('helpHide');
  document.querySelector('.text').classList.add('helpHide');
});

// hold section

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
