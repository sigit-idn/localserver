//* futureshop GOOGLE
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await (await fetch(`http://localhost:8888/tayutafu`)).json();

document.querySelector("#title").value = data.itemName.split("【")[0];
document.querySelector("#mpn").value = data.itemNumber.replace("-", "");

document.querySelectorAll("[name^=\"verticalImagePath\"]").forEach((input, i, inputs) => {
  input.value = inputs[0].value.replace(/(-0*)(\d{1,2})(-)/,
    (_, p1, p2, p3) => `${p1}${parseInt(p2) + i}${p3}`);
})

await new Promise((resolve) => setTimeout(resolve, 1000));

document.querySelector("#submit_0").click();