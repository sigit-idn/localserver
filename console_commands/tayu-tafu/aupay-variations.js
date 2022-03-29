//* aupay VARIATION
let data = await (await fetch(`http://localhost:8888/tayutafu`)).json()

document
  .querySelectorAll("input[name*=choicesColLabel]")
  .forEach((sizeInput, i) => (sizeInput.value = data.size[i] || ""));
document
  .querySelectorAll("input[name*=choicesRowLabel]")
  .forEach((sizeInput, i) => (sizeInput.value = data.color[i] || ""));

let colArray = [
  ...document.querySelectorAll(
    `#choiceRowTable .styleConfig:nth-child(1) input`
  ),
].map((input) => input.value);
let rowArray = [
  ...document.querySelectorAll(`#choiceColTable tr:first-child input`),
].map((input) => input.value);
document
  .querySelectorAll(`#stockMatrix tr`)
  .forEach((tr, i) =>
    tr
      .querySelectorAll("input")
      .forEach(
        (input, j) => (input.value = colArray[i] ? (rowArray[j] ? 0 : "") : "")
      )
  );
document
  .querySelectorAll(`#choiceRowTable .styleConfig:nth-child(2) input`)
  .forEach((input, i) => (input.value = colArray[i] ? "Y" + (1000 + i) : ""));
document
  .querySelectorAll(`#choiceColTable tr:nth-child(2) input`)
  .forEach((input, i) => (input.value = rowArray[i] ? "X" + (1000 + i) : ""));
