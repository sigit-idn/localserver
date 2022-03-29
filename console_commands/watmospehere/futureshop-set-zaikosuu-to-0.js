//* futureshop set ZAIKOSUU to 0
[...document.querySelectorAll("input")]
  .filter((input) => input.name.includes("janCode"))
  .forEach(
    (janInput) => 
    (janInput.value =
      janInput.parentElement.previousElementSibling.innerText)
  );
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });

[...document.querySelectorAll("input")]
  .filter((input) => input.id.includes("addStockCount"))
  .forEach(
    (newStock, i) => 
    (newStock.value = -document.querySelectorAll("table td:nth-child(6)")[i]
      .innerText)
  );
  document.querySelector("#submit_5").click();
