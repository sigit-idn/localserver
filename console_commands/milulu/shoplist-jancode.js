//! Shoplist JANCODE

let { shoplistJanCode } = await (await fetch("http://localhost:8888/milulu")).json();

document.querySelectorAll("input[name^=jan_code]")
  .forEach(
    (janInput, i) => {
      console.log(janInput.parentElement.previousElementSibling.innerText.toLowerCase());
      (janInput.value = 
        shoplistJanCode[
          janInput.parentElement.previousElementSibling.innerText
        ] ?? "")
      }
  );

