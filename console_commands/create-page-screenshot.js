//* Create Page Screenshot
if (/shot/.test(window.location.href)) {
  document.body.style.width = 650
  NodeList.prototype.filter = Array.prototype.filter;
  let groups = ["a", "b", "c"];
  
// document.querySelectorAll('[src*=ttl-]').forEach(({ parentElement }) => {
//   let group = document.createElement('div');
//   group.className = groups[i];
//   group.appendChild(parentElement);
//   group.appendChild(parentElement.nextElementSibling);
//   parentElement.parentElement.replaceChild(group, parentElement);
// });

  };

  if (/spec/.test(window.location.href)) document.body.style.padding = "2px";

    document.querySelector(".floating-cart-wrapper")?.remove();
    document.querySelector("#iFixed")?.remove();
    document.querySelector("#rakutenLimitedId_header")?.remove();
    document.querySelector("#chat_widget")?.remove();
    if (document.getElementById('pageWrap')) document.getElementById('pageWrap').previousElementSibling.style.marginLeft = "-20vw"

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
