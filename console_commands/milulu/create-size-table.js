//* Create size TABLE

let sizeInput = prompt("Size");

let sizeHeaders = sizeInput
  .replace(/"/g, "")
  .replace(/\n（/g, "（")
  .match(/((\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤])\S+)|丈/gu);
let sizeValues = sizeInput
  .split(sizeHeaders[sizeHeaders.length - 1])[1]
  .match(/(\w|[ａ-ｚ])\S*/giu);

let sizeRows = [];

for (let i = 0; i < sizeValues.length - 1; i++) {
  let sizeRow = [];
  if (!(i % sizeHeaders.length)) {
    for (let j = i; j < i + sizeHeaders.length; j++) {
      sizeRow.push(sizeValues[j]);
    }
    sizeRows.push(sizeRow);
  }
}

sizeHeaders =
  "<thead>\n<tr>" +
  sizeHeaders
    .map((header) => `<th>${header.replace(/（/g, "<br>（")}</th>`)
    .join("") +
  "</tr>\n</thead>";
sizeRows = "<tbody>\n" + sizeRows
  .map(
    (row) =>
      "<tr>" + row
        .map((col, i) => (i == 0 ? `<th>${col}</th>` : `<td>${col}</td>`))
        .join("") +
      "</tr>"
  )
  .join("\n") + "\n</tbody>";

copy(sizeHeaders + "\n" + sizeRows);
