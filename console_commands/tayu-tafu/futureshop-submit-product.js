//* Futureshop SUBMIT product
(async () => {
  if (document.querySelector('a.copyEntry')) return document.querySelector('a.copyEntry').click()
  document.querySelector(".dataTable_01").scrollIntoView({ behavior: "smooth" });

  let data = await (await fetch(`http://localhost:8888/tayutafu`)).json()

  document.querySelector("#goodsCatchCopy").value = data.catchCopy + "<br>";
  document
    .querySelectorAll("#goodsName, input#goodsTitleExternal")
    .forEach((input) => (input.value = data.itemName.split("【")[0]));
  document.querySelector("#goodsDescriptionExternal").value = data.description;
  document.querySelector("#goodsNo").value                  = data.itemNumber;
  document.querySelector("#goodsUrl").value                 = data.itemNumber;
  document.querySelector("#unitPrice").value                = data.priceNoTax;

  await new Promise((resolve) => {
    document.querySelector("#goodsCatchCopy").onblur = resolve;
    setTimeout(resolve, 5000)
  });

  document.querySelector("#submit_0").click();
})()