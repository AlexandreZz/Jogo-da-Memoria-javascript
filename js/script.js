const FRONT = 'card_front';
const BACK  = 'card_back';
const CARD  = 'card';
const ICON  = 'icon';

let cards = null;
startGamer();

function startGamer(){
    inicializarCards(game.createCardsFromTechs());
}

function inicializarCards(cards){
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {
        let cardElementAdd =  document.createElement('div');
        cardElementAdd.id = card.id;
        cardElementAdd.classList.add(CARD);
        cardElementAdd.dataset.icon = card.icon;
        
        createCardContent(card,cardElementAdd);

        cardElementAdd.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElementAdd)
    });
}

function createCardContent(card, cardElement){
    createCardFace(FRONT,card,cardElement);
    createCardFace(BACK,card,cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = './img/' + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = '&lt/&gt';
    }
    element.appendChild(cardElementFace);
}

function flipCard(){
    if(game.setCard(this.id)){

        this.classList.add('flip');

        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverElement = document.getElementById('gameOver');
                    gameOverElement.style.display = 'flex';
                }
            }else{
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
        
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCard();
                }, 1000);
            }
        }
    }
}


function restartGame(){
    game.clearCards();
    startGamer();
    let gameOverElement = document.getElementById('gameOver');
    gameOverElement.style.display = 'none';
}