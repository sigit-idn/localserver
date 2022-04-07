// Create Staff Comments

let comments = [prompt("コメント1"), prompt("コメント2"), prompt("コメント3")];

let commentsHtml = comments
  .map((comment) => {
    const modelHeight = comment.match(/\d{3}cm/);
    const size = comment.match(/\w{1,2}(号|サイズ)(?=着)/)[0];
    const statement = comment.match(/.*(\n.*)*(?=\n\w{1,2}(号|サイズ))/);

    // [0]?.replace(/\n/g, "");

    return ` <ul>
  <li id="rw-icon_1"><p><span>STAFF・1</span></p></li><li><dl>
  <dt>身長：${modelHeight}</dt>
  <dd><b>着用：${size}</b>
    ${statement}
    </dd></dl></li></ul>
  `;
  })
  .join("\n");

copy(commentsHtml);



//! Store Data
let data = await(
  await fetch(
    "https://script.google.com/macros/s/AKfycbyxdiJmE_Tim7NxQJN6FStbIK0lZ154BWTKE6j4-N0MzbcKG7zEMKUCsZdp-cj5owYtWQ/exec"
  )
).json();

let categories = {
  bl: "tops",
  op: "onepiece",
  sk: "bottom",
  st: "suit",
  pt: "bottom",
  jk: "tops",
  ct: "tops",
};

if (data.productNumber[0] == "k") {
  data.category = "accessories";
} else {
  data.category = categories[data.productNumber.match(/[a-zA-Z]{2,3}/)];
}

fetch("http://localhost:8888/milulu", {
  method: "POST",
  "Content-Type": "application/json",
  body: JSON.stringify(data),
})
  .then(async (res) => console.log("Written succesfuly", await res.text()))
  .catch((error) => console.log("Error", error));



// Rakuten find DirectoryID

let searchQuery = prompt("Category");

let found = 0;

while (!found) {
  document
    .querySelectorAll(
      "[class^=treeviewer-list-] :not([class^=expanded]) [class^=parent-label]"
    )
    .forEach((li) => li.click());

  document
    .querySelectorAll("[class^=treeviewer-list-] label")
    .forEach((label) => {
      if (new RegExp(searchQuery).test(label.innerText)) {
        label.scrollIntoView({ behavior: "smooth" });
        label.style.backgroundColor = "#ff0";
        found++;
      }
    });
}



//! Shoplist JANCODE(reverse)

let { shoplistJanCode } = await fetch("http://localhost:8888/milulu")
  .then((res) => res.json())
  .then((data) => data);
let janObject = {};
shoplistJanCode.forEach((jan) => {
  const janArray = jan.split(" ");
  if (janArray.length > 2) {
    janObject[jan.split(" ")[2]] = jan.split(" ")[1];
  } else {
    janObject[jan.split(" ")[1]] = jan.split(" ")[0];
  }
});

document
  .querySelectorAll("input[name^=jan_code]")
  .forEach(
    (janInput, i) =>
    (janInput.value = String(
      janObject[janInput.parentElement.parentElement.children[2].innerText]
    ).replaceAll(undefined, ""))
  );



// Sleep
let sleep = (ms) => {
  const start = new Date().getTime();
  while (true) if ((new Date().getTime() - start) > ms) break;
}

