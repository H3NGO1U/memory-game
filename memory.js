const cards = document.querySelectorAll(".memory-card");
let hasFlipped = false;
let tries = 0;
let matches = 0;
let record = 0;
let firstCard;
let secondCard;
let lockBoard = false;
shuffle();
function flip() {
  if(lockBoard) return;
  this.classList.add('flip');
  if(!hasFlipped)
    firstCard= this;
  
  else{
    if(this === firstCard) return;
    secondCard = this;
    tries++;
    checkForMatch();

  }
  writeResult();
  if(matches == 6)
    setTimeout(endGame, 1000);
  hasFlipped = !hasFlipped;
}
function disableCards(){
  firstCard.removeEventListener('click',flip);
  secondCard.removeEventListener('click',flip);
  matches++;
  resetBoard();
}
function flipBackCards(){
      lockBoard = true;
      setTimeout(() => {firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();}, 1000);
      
}
function checkForMatch(){
  let equal = firstCard.dataset.framework === secondCard.dataset.framework;
  equal ? disableCards() : flipBackCards();
}

function resetBoard(){
  [firstCard, secondCard] = [null, null];
  lockBoard = false;

}
function writeResult(){
  document.getElementById('tries').innerText="tries: "+tries;
  if(record!=0) 
    document.getElementById('record').innerText="record: "+record;
}
function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random()*12);
    card.style.order = randomPos;
  })
}
function endGame(){
  cards.forEach(card => card.classList.remove('flip'));
  if(tries < record || record == 0) record = tries;
  tries = 0;
  matches = 0;
  writeResult();
  resetBoard();
  cards.forEach(card => card.addEventListener('click', flip));
  shuffle();
}

cards.forEach(card => card.addEventListener('click', flip));