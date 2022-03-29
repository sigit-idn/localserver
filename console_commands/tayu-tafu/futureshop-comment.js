//* futureshop COMMENT
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await (await fetch(`http://localhost:8888/tayutafu`)).json()

document.querySelector("#outline").value         = data.itemName.split("【")[0];
document.querySelector("#descriptionLong").value = data.futureshopHtml;

document.querySelector("#descriptionLong").addEventListener("blur", () => 
document.querySelector("#submit_0").click());
