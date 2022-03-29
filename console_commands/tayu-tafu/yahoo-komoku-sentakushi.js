//* Yahoo KOMOKU sentaku
let tabIndex = 1

for (let i = 0; i < 10; i++) {
  setTimeout(() => document.querySelector('.optionSelection__addLink').click(), i * 1000)
}

document
  .querySelectorAll(
    ".optionSelection__column:first-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => {
    input.tabIndex = tabIndex++;
    inputValueChanger.call(input, data.color[i - 1] ?? "");
    input.onfocus = () => {
      inputValueChanger.call(input, data.color[i - 1] ?? "")
      input.tabIndex = -1;
    };
  });
document
  .querySelectorAll(
    ".optionSelection__column:last-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => {
    input.tabIndex = tabIndex++;
    inputValueChanger.call(input, data.size[i - 1] ?? "")
    input.addEventListener("focus", () => {
      inputValueChanger.call(input, data.size[i - 1] ?? "");
      input.tabIndex = -1;
    }
    );
  });

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});
