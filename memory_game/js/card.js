/**
 * Описывает отдельную карту, которая может отображаться рубашкой или изображением вверх
 * #image - изображение, которое отображается на карте;
 * #element - DOM узел который представляет изображение;
 * #isFlipped - перевернута карта или нет;
 */
class Card {
  #image;
  #element;
  #isFlipped = false;

  constructor(image) {
    this.#image = image;

    this.#element = document.createElement("div");
    this.#element.classList.add("card");
    this.#element.style.backgroundImage =`url('${this.coverPath}')`;
    this.#element.style.backgroundSize = `cover`;
    this.#element.connectedCard = this; // В свойстве DOM объекта будет находиться ссылка на экземпляр карты
  }

  get imagePath () {
    return `img/${this.#image}`
  }

  get coverPath () {
    return 'img/solid.png';
  }

  get element () {
    return this.#element;
  }

  flip() {
    if(this.#isFlipped) {
      this.#element.style.backgroundImage = `url('${this.coverPath}')`;
      this.#element.style.backgroundSize = `cover`;
    }else{
      this.#element.style.backgroundImage = `url('${this.imagePath}')`;
      this.#element.style.backgroundSize = `contain`;
    }
    this.#isFlipped = !this.#isFlipped;
  }

  disconnectFromDom() {
    this.#element.connectedCard = null;
  }
}