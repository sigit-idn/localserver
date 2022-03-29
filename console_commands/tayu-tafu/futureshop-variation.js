//* futureshop VARIATION
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

document.querySelectorAll("input[id*=verticalItemName]")
  .forEach(
    (colorInput, i) => (colorInput.value = data.color[i] ? data.color[i] : "")
  );
document.querySelectorAll("input[id*=verticalAdminNo]")
  .forEach(
    (colorInput, i) => 
      (colorInput.value = data.color[i] ? "Y" + (1000 + i) : "")
  );
document.querySelectorAll("input[id*=horizontalItemName]")
  .forEach(
    (sizeInput, i) => (sizeInput.value = data.size[i] ? data.size[i] : "")
  );
document.querySelectorAll("input[id*=horizontalAdminNo]")
  .forEach(
    (sizeInput, i) => (sizeInput.value = data.size[i] ? "X" + (1000 + i) : "")
  );
document.querySelectorAll("input[name*=verticalDelete]")
  .forEach((colorDelete, i) => (colorDelete.checked = !data.color[i] && true));
document.querySelectorAll("input[name*=horizontalDelete]")
  .forEach((sizeDelete, i) => (sizeDelete.checked = !data.size[i] && true));
document.querySelector("#itemNameVertical").value = data.color[0]
  ? "カラー"
  :  "";
document.querySelector("#itemNameHorizontal").value = data.size[0]
  ? "サイズ"
  :  "";

await new Promise((resolve) => setTimeout(resolve, 1000));

document.querySelector("#submit_0").click();
