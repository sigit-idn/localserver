//* Local Image SRC

document.querySelector(".floating-cart-wrapper")?.remove();
document.querySelector("#iFixed")?.remove();
document.querySelector("#rakutenLimitedId_header")?.remove();
document.querySelector("#chat_widget")?.remove();
if (document.querySelector("#pagebody > div:nth-child(10)")) {
  document.querySelector("#pagebody > div:nth-child(10)").style.marginLeft =
    -280 ?? "";
}
document
  .querySelectorAll("#pageGallery div dl, #pageSpec > div")
  .forEach(({ style }, i) => {
    style.paddingRight = 1;
    style.marginRight = i % 2 == 1 ? 0 : 1;
    style.paddingBottom = 2;
  });
document.querySelectorAll("img")?.forEach((img) => {
  let filename = img.src.match(/[a-z]{1,2}\d{6}[a-z]{2}\d{1}.+/i);
  img.addEventListener("error", function replaceSrc() {
    img.src = "../images/" + filename;
    img.removeEventListener("error", replaceSrc);
  });
  img.src = img.src;
});

document
  .querySelectorAll("li.up")
  ?.forEach((li) => (li.style.listStyle = "none"));

let number = localStorage.getItem("spNumber") ?? 1;