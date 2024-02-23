const jsdom = require("jsdom");
const fs = require("fs");

const POSTALES = [
  "https://desmusea.substack.com/p/message",
  "https://desmusea.substack.com/p/message-1",
  "https://desmusea.substack.com/p/message-2",
  "https://desmusea.substack.com/p/message-3",
  "https://desmusea.substack.com/p/message-4",
  "https://desmusea.substack.com/p/message-5",
  "https://desmusea.substack.com/p/message-6",
  "https://desmusea.substack.com/p/message-7",
  "https://desmusea.substack.com/p/message-8",
  "https://desmusea.substack.com/p/message-9",
];

(async function getData() {
  const verses = [];

  for (let index = 0; index < POSTALES.length; index++) {
    const url = POSTALES[index];

    const response = await fetch(url);
    const html = await response.text();
    const doc = new jsdom.JSDOM(html).window.document;

    const paragraphs = doc.querySelectorAll(".body > p");

    for (let index = 0; index < paragraphs.length; index++) {
      if (
        paragraphs
          .item(index)
          .textContent.toLowerCase()
          .includes("bonus track:")
      ) {
        break;
      }

      const paragraph = paragraphs.item(index).outerHTML.split("<br>");

      paragraph.forEach((p) => {
        const body = new jsdom.JSDOM(p).window.document.querySelector(
          "body"
        ).textContent;

        const result = body.match(/.*?((\.\s|$)|[\n\r!\?])/g);

        if (result?.length) {
          result.forEach(
            (r) => r.replace(/\s/g, "").trim() && verses.push(r.trim())
          );
        } else if (body && body.replace(/\s/g, "").trim()) {
          verses.push(body.trim());
        }
      });
    }
  }

  const DIR = "./data";

  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }

  fs.writeFileSync(
    `${DIR}/postales.json`,
    JSON.stringify(
      [...new Set(verses)].map((verse) => {
        if (verse.length > 30) {
          const end = verse.indexOf(" ", 30);
          return verse.substring(0, end === -1 ? 30 : end);
        }

        return verse;
      })
    )
  );
})();
