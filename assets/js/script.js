var gameCards = document.getElementById('gameCards');
var resetBtn = document.getElementById('resetBtn');
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;

gameCards.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetGame);

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }

  var cardClicked = event.target;

  cardClicked.classList.add('hidden');

  if (!firstCardClicked) {
    firstCardClicked = cardClicked;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = cardClicked;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    attempts++;
    if (firstCardClasses === secondCardClasses) {
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;

      if (matches === maxMatches) {
        var modal = document.querySelector('.modal');
        modal.classList.remove('hidden');
      }
      console.log('Matches:', matches);
    } else {
      setTimeout(function() {
        firstCardClicked.classList.remove('hidden');
        secondCardClicked.classList.remove('hidden');
        gameCards.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
    }
    displayStats();
  }
}

function displayStats() {
  var gamesPlayedElement = document.getElementById('gamesPlayed');
  var attemptsElement = document.getElementById('attempts');
  var accuracyElement = document.getElementById('accuracy');
  gamesPlayedElement.textContent = gamesPlayed;
  attemptsElement.textContent = attempts;
  accuracyElement.textContent = calculateAccuracy(attempts, matches) + '%';
}

function calculateAccuracy(attempts, matches) {
  if (!attempts) {
    return '0';
  }
  return Math.trunc((matches / attempts) * 100);
}

function resetGame() {
  matches = 0;
  attempts = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  var modal = document.querySelector('.modal');
  modal.classList.add('hidden');
}

function resetCards() {
  var hiddenCards = document.querySelectorAll('.card-back');
  console.log('hiddenCards', hiddenCards.length);
  let i;
  for (i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove('hidden');
  }
}
