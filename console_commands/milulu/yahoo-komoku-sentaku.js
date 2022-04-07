//! Yahoo KOMOKU sentaku

document
  .querySelectorAll(
    ".optionSelection__column:first-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => {
    input.tabIndex = i + 1;
    input.addEventListener("focus", () => {
      input.tabIndex = 0;
      inputValueChanger.call(input, String(data.colors[i - 1] ?? ""));
    });
    input.dispatchEvent(new Event("focus", { bubbles: true }));
  });
document
  .querySelectorAll(
    ".optionSelection__column:last-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => {
    input.tabIndex = i + 1;
    input.addEventListener("focus", () => {
      input.tabIndex = 0;
      inputValueChanger.call(input, String(data.sizes[i - 1] ?? ""));
    });
    input.dispatchEvent(new Event("focus", { bubbles: true }));
  });