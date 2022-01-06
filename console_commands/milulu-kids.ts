//* Create kids size table

let sizeInput = prompt("Size");

let sizeHeaders = sizeInput
  .replace(/"/g, "")
  .replace(/\n（/g, "（")
  .match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤])\S*/gu);
// .match(/\d{3}/g)

sizeHeaders.unshift('サイズ(cm)');
let sizeTitles = sizeInput.match(/\d{3}/g)
let sizeValues = sizeInput.match(/(\d|\.)+/g)

let sizeRows = []

for (let i = 0; i < sizeValues.length; i++) {
  if(!(i % sizeTitles.length)) sizeRows.push([])
}

sizeRows.forEach((_, i) => {
  for (let j = i; j < i + sizeHeaders.length; j++) {
    sizeRows[i].push()
  }
})

let sizeValues = sizeInput
  .split(sizeHeaders[sizeHeaders.length - 1])[1]
  .match(/(\w|[ａ-ｚ])\S*|(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤])\S*/giu);

let sizeCols = [];

for (let i = 0; i < sizeValues.length - 1; i++) {
  let sizeCol = [];
  if (!(i % sizeHeaders.length)) {
    for (let j = i; j < i + sizeHeaders.length; j++) {
      sizeCol.push(sizeValues[j]);
    }
    sizeCols.push(sizeCol);
  }
}

sizeHeaders =
  "<tr>" +
  sizeHeaders
    .map((header) => `<th>${header.replace(/（/g, "<br>（")}</th>`)
    .join("") +
  "</tr>";
sizeRows = sizeRows
  .map(
    (row) =>
      "<tr>" +
      row
        .map((col, i) => (i == 0 ? `<th>${col}</th>` : `<td>${col}</td>`))
        .join("") +
      "</tr>"
  )
  .join("\n");

copy(sizeHeaders + "\n" + sizeRows);

