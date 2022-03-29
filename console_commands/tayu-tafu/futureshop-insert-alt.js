//* futureshop insert ALT
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

let valuedSelect;
document.querySelectorAll('select[name$=VerticalSelect][name^=goodsImage]').forEach((variation, i) => {
  const optionsCount = variation.options.length;
  if (variation.value) valuedSelect = i;
  const variationOption = variation.options[i - valuedSelect + 1]
  if ( i > valuedSelect && optionsCount > 1 && variationOption) 
    variationOption.selected = true;
    variation.dispatchEvent(new Event('change'));
})
document.querySelectorAll("[type=checkbox][name*=VerticalThumbnail]")
  .forEach((checkbox) => (checkbox.checked = true));

document
  .querySelectorAll("#form > div > table:nth-child(6) input[maxlength='500']")
  .forEach((input) => (input.value = data.itemName.split("【")?.[0]));

document.querySelector(
  "#form > div > table:nth-child(6) > tbody > tr:nth-child(2) > th > label > input[type=radio]"
).checked = true;
document.querySelector("#submit_0").click();
