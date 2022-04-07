//! Shoplist MULTIPLE image upload

let tbody = document.querySelector("#main > form > table > tbody");
let form = document.querySelector("form");
let formData = new FormData(form);

tbody.querySelectorAll("input[type=file]").forEach((uploadInput) => {
  uploadInput.multiple = true;
  uploadInput.addEventListener("change", () => {
    const files = [...uploadInput.files];
    files.forEach((file, i) => {
      formData.append(`upload_image[${i + 2}]`, file);
    });
  });
});

form.onsubmit = (event) => {
  event.preventDefault();
  document.querySelector('[href="#Submit"]').innerHTML = `アップロード中...`;
  document.querySelector('[href="#Submit"]').style.backgroundColor = `#3338`;
  document.querySelector('[href="#Submit"]').style.cursor = `wait`;
  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      console.log(await res.text());
      if (confirm("アップロード完了!\nウィンドウ閉じる？")) {
        window.close();
      } else {
        document.querySelector('[href="#Submit"]').innerHTML = `登録`;
        document.querySelector(
          '[href="#Submit"]'
        ).style.backgroundColor = `#333`;
        document.querySelector('[href="#Submit"]').style.cursor = `pointer`;
        form.reset();
        formData = new FormData(form);
      }
    })
    .catch((error) => console.error(error));
};