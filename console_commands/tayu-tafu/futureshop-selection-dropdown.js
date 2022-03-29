//* Futureshop selection DROPDOWN
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);
document.querySelectorAll("input[id*=selectionItemName]")
  .forEach(
    (dorpdownItem, i) => 
    (dorpdownItem.value = data.selection[i]
      ? Object.keys(data.selection[i])
      : null)
  );
document.querySelectorAll("input[id*=selectionName]")
  .forEach(
    (dorpdownItem, i) => 
    (dorpdownItem.value = data.selection[i]
      ? data.selection[i][Object.keys(data.selection[i])].join("~")
      : null)
  );
