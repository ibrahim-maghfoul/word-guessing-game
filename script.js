const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "word", "programming", "wisard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLeters = [];
const wrongLetters = [];
/* Functions */

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `<span class= "letter">
    ${correctLeters.includes(letter) ? letter : ""}</span>`
    )
    .join("")}`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congrats! , You won!";
    popup.style.display = "flex";
  }
}
// update the wrong letters
function updateWrongLettersEl() {
  //Display Letters
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;
  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // chek if lost

  if (wrongLetters.length == figureParts.length) {
    finalMessage.innerHTML = "You lost";
    popup.style.display = "flex";
    console.log("You lost");
  }
}

// show Notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
/* EventListners */

window.addEventListener("keydown", (event) => {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letter = event.key;
    if (selectedWord.includes(letter)) {
      if (!correctLeters.includes(letter)) {
        correctLeters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});
console.log(playAgainBtn);
playAgainBtn.addEventListener("click", () => {
  correctLeters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none";
});
displayWord();
