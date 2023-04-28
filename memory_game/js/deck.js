/**
 * Колода карт. Класс отвечает за создание и тасование карт. Содержит список изображений карт.
 */
class Deck {
  #cartImages = [
    "bas.png",
    "car.png",
    "helicopter.png",
    "historic-ship.png",
    "hot-air-balloon.png",
    "kids-pool.png",
    "knitted-frog.png",
    "truck.png",
    "viking-ship.png",
    "tricycle.png"
  ];
  constructor() {
    this.cards = [];
    this.#cartImages.forEach(image => {
      this.cards.push(new Card(image));
      this.cards.push(new Card(image));
    });
  }
  shuffle () {
    this.cards.sort(() => Math.random() - 0.5); //расставляем картинки в случайном порядке
  }
  removeCard (card) {
    let index = this.cards.findIndex(item => item.imagePath == card.imagePath);
    if (index != -1) {
      this.cards.splice(index, 1);
      card.disconnectFromDom();
    }
  }
}