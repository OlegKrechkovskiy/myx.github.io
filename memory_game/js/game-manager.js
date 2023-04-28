/**
 * Управляет игрой. Запоминает какие карты были открыты, управляет колодой и считает количество поппыток.
 * Связывает JS с интерфейсом
 */
class GameManager {
  #boardElement;
  #scoreElement;
  #deck = new Deck();
  #firstCard = null;
  #secondCard = null;
  #attemptNumber = 0;

  constructor(board, score) {
    if (typeof board === "string") {
      this.#boardElement = document.querySelector(board);
    } else {
      this.#boardElement = board;
    }
    if (typeof score === "string") {
      this.#scoreElement = document.querySelector(score);
    } else {
      this.#scoreElement = score;
    }
  }

  startGame () {
    this.attemptNumber = 0;
    this.#deck = new Deck();
    this.#boardElement.innerHTML = "";
    this.#boardElement.classList.remove("vibrate-1");
    this.#boardElement.classList.add("swirl-in-fwd");
    this.shuffleAndDeal();
  }

  shuffleAndDeal () {
    this.#deck.shuffle();
    this.#deck.cards.forEach(card => {
      this.#boardElement.append(card.element);
    });
  }

  SelectCard (card) {
    this.#boardElement.classList.remove("swirl-in-fwd");
    if (card == this.#firstCard) return; //если второй раз нажали на одну и ту же карту - ничего не делаем
    card.flip();

    //если есть значение в двух полях, значит предидущие карты не совпали
    // переворачиваем их рубашкой вверх
    if (this.#firstCard && this.#secondCard) {
      this.#firstCard.flip();
      this.#secondCard.flip();

      this.#firstCard = this.#secondCard = null;
    }

    //если выбрана одна карта запоминаем ее
    if (this.#firstCard == null) {
      this.#firstCard = card;
    } else if (this.#secondCard == null) {
      this.attemptNumber++;
      this.#secondCard = card;

      //если найдены карты с одинаковым изображением
      if(this.#firstCard.imagePath == this.#secondCard.imagePath) {
        this.#deck.removeCard(this.#firstCard); //убираем карты из колоды
        this.#deck.removeCard(this.#secondCard);

        this.#firstCard = this.#secondCard = null;
      }
    }

    if(this.#deck.cards.length == 0) {
      this.#boardElement.classList.remove("swirl-in-fwd");
      this.#boardElement.classList.add("vibrate-1");
    }
  }
  get attemptNumber() {
    return this.#attemptNumber;
  }

  set attemptNumber(value) {
    this.#attemptNumber = value;
    this.#scoreElement.innerHTML = value;
  }
}