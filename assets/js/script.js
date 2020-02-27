var gameCards = document.getElementById('gameCards');

gameCards.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }
  var cardClicked = event.target;
  cardClicked.classList.add('hidden');
}
