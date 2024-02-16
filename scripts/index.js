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
  const myHeaders = new Headers();
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    mode: "cors",
  };

  fetch(POSTALES[0], requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
})();
