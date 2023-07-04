// Definición de los símbolos de las cartas
const SYMBOL_CARD = ["♦", "♥", "♠", "♣"];

// Definición de los valores numéricos de las cartas
const CARD_ITEM = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// Definición de las cartas con letras (J, Q, K)
const CARD_LETTERS = ["J", "Q", "K"];

// Obtención de referencias a elementos del DOM
const CARDS_INPUT = document.querySelector(".ncards");
const DRAW_BUTTON = document.querySelector(".draw");
const SORT_BUTTON = document.querySelector(".sort");
const CARD_CONTAINER = document.querySelector(".card-container");

// Función para generar una nueva carta aleatoria
function newCard() {
  let item;
  // Hay un 30% de probabilidad de que la carta sea una letra (J, Q, K)
  if (Math.random() < 0.3) {
    item = CARD_LETTERS[Math.floor(Math.random() * CARD_LETTERS.length)];
  } else {
    item = CARD_ITEM[Math.floor(Math.random() * CARD_ITEM.length)];
  }
  const suit = SYMBOL_CARD[Math.floor(Math.random() * SYMBOL_CARD.length)];
  return { item, suit };
}

// Función para dibujar las cartas en el contenedor
function drawCards(cards) {
  CARD_CONTAINER.innerHTML = "";

  for (const card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const topElement = document.createElement("div");
    topElement.classList.add("top");
    topElement.textContent = `${card.item} ${card.suit}`;
    cardElement.appendChild(topElement);

    const suitElement = document.createElement("div");
    suitElement.classList.add("suit");
    suitElement.textContent = card.suit;
    cardElement.appendChild(suitElement);

    const bottomElement = document.createElement("div");
    bottomElement.classList.add("bottom");
    bottomElement.textContent = `${card.item} ${card.suit}`;
    cardElement.appendChild(bottomElement);

    // Agregar estilos de color dependiendo del símbolo de la carta
    if (card.suit === "♦" || card.suit === "♥") {
      topElement.classList.add("color1");
      suitElement.classList.add("color1");
      bottomElement.classList.add("color1");
    } else {
      topElement.classList.add("color2");
      suitElement.classList.add("color2");
      bottomElement.classList.add("color2");
    }

    CARD_CONTAINER.appendChild(cardElement);
  }
}

let cards = [];

// Event listener para el botón "Draw" (Dibujar)
DRAW_BUTTON.addEventListener("click", event => {
  event.preventDefault();
  const numberOfCards = parseInt(CARDS_INPUT.value);

  if (numberOfCards > 0) {
    // Generar un array de cartas aleatorias
    cards = Array.from({ length: numberOfCards }, newCard);
    drawCards(cards);
  }
});

// Event listener para el botón "Sort" (Ordenar)
SORT_BUTTON.addEventListener("click", event => {
  event.preventDefault();
  // Ordenar las cartas en base a su valor numérico o letra
  cards.sort((a, b) => a.item - b.item);
  drawCards(cards);
});
