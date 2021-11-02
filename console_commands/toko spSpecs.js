let spSpecs = `
<tr><td bgcolor="#000"><font color="#fff"><center>Specs</center></font></td></tr>
<tr><td height="20"></td></tr>
<tr><td>
<table border="1" width="100%" cellspacing="0" cellpadding="2">
  <tr>
    <th>
      サイズ/実寸
    </th>
    <td>
      <table border="1" width="100%" cellspacing="0" cellpadding="2">
          <tr>
          ${headers.map((header) => `<th>${header}</th>`).join()}
          </tr>
          ${data
            .map((datum) => {
              const number = datum.match(/\d+(\d|\.)+/g);
              const splitSlash = datum.split("/");
              const splitTilde = datum.split("～");

              if (splitSlash.length > 1) {
                return `<td>前 ${splitSlash[0]}cm/後 ${splitSlash[1]}cm</td></tr>`;
              } else if (splitTilde.length > 1) {
                return `<tr><td>${splitTilde[0]}cm～${splitTilde[1]}cm</td></tr>`;
              } else {
                return `<tr><td>${datum.replace(
                  number,
                  number + "cm"
                )}</td></tr>`;
              }
            })
            .join()})}
      </table>
    </td>
  </tr>
  <tr>
    <th>
      モデル(身長)
    </th>
    <td>
      166cm
    </td>
  </tr>
  <tr>
    <th>
      素材
    </th>
    <td>
      <table>
      ${materialHeaders
        .map(
          (header, i) => `<tr><th>${header}<th><td>${materialData[i]}</td></tr>`
        )
        .join("<br>\n")}
      </table>
    </td>
  </tr>
</table>
`;
