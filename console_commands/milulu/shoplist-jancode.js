//! Shoplist JANCODE

let { shoplistJanCode } = await (await fetch("http://localhost:8888/milulu")).json();

document.querySelectorAll("input[name^=jan_code]")
  .forEach(
    (janInput) => {
      const { innerText } = janInput.parentElement.previousElementSibling
      
      janInput.value = shoplistJanCode[innerText] ?? ""
      }
  );

