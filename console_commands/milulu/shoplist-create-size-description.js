// Shoplist Create Size Description

let sizeInput = prompt("Size");

let sizeHeaders = sizeInput
  .replace(/"/g, "")
  .replace(/\n（/g, "（")
  .match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]|ｻ|ｽ|ﾊﾞ)\S*/gu);
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

copy(
  sizeRows
    .map((row) =>
      row
        .map((col, i) =>
          i != 0 ? sizeHeaders[i] + ` ${col}cm` : col + "号<br>\n"
        )
        .join(" / ")
    )
    .join("<br>\n")
    .replace(/\n \/ /g, "\n")
);
