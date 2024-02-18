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

        for (let index = 0; index < 10; index++) {
          const article = document.createElement("article");

          for (let index = 0; index < 14; index++) {
            const addEmptyLine = index === 4 || index === 8 || index === 11;

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
