const verses = new Array(14).fill(9);

const nextVerse = (verse) => {
  const currentPoem = verses[verse];

  if (currentPoem === 0) {
    return;
  }

  const poems = document.querySelectorAll("main>article");
  const poemVerses = poems.item(currentPoem).querySelectorAll("p");
  poemVerses.item(verse).classList.toggle("turned");
  poemVerses.item(verse).classList.remove("unturned");

  verses[verse] = currentPoem - 1;
};

const prevVerse = (verse) => {
  const currentPoem = verses[verse];

  if (currentPoem === 9) {
    return;
  }

  const poems = document.querySelectorAll("main>article");
  const poemVerses = poems.item(currentPoem + 1).querySelectorAll("p");
  poemVerses.item(verse).classList.toggle("turned");
  poemVerses.item(verse).classList.toggle("unturned");

  verses[verse] = currentPoem + 1;
};

const prevVerses = document.querySelectorAll("#prev-pages > p");
const nextVerses = document.querySelectorAll("#next-pages > p");

prevVerses.forEach((item, key) => {
  if (item.className !== "empty") {
    item.addEventListener("click", () => prevVerse(key));
  }
});

nextVerses.forEach((item, key) => {
  if (item.className !== "empty") {
    item.addEventListener("click", () => nextVerse(key));
  }
});

const shuffleArray = (arr) =>
  arr
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);

(async function getData() {
  fetch("/data/postales.json")
    .then((response) => response.json())
    .then((result) => {
      if (Array.isArray(result)) {
        const postales = shuffleArray(result).slice(0, 140);
        const main = document.getElementsByTagName("main").item(0);

        let count = 0;

        const addNode = (article, data) => {
          const paragraph = document.createElement("p");
          const node = document.createTextNode(data);
          paragraph.appendChild(node);
          article.appendChild(paragraph);
        };

        for (let i = 0; i < 10; i++) {
          const article = document.createElement("article");

          for (let j = 0; j < 14; j++) {
            const addEmptyLine = j === 4 || j === 8 || j === 11;

            if (addEmptyLine) {
              addNode(article, "\u00A0");
            }

            addNode(article, postales[count]);
            count++;
          }

          main.appendChild(article);
        }
      }
    })
    .catch((error) => console.log("error", error));
})();
