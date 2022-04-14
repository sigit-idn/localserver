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

form.onsubmit = async(event) => {
    event.preventDefault();
    const submitButton = document.querySelector('[href="#Submit"]')
    const setButton = (innerHTML, backgroundColor, cursor) => {
        submitButton.innerHTML = innerHTML;
        submitButton.style.backgroundColor = backgroundColor;
        submitButton.style.cursor = cursor;
    };

    setButton(`アップロード中...`, `#3338`, `wait`);

    const response = await fetch(form.action, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) return console.error(response);

    if (confirm("アップロード完了!\nウィンドウ閉じる？")) return window.close();

    setButton(`アップロード`, `#0066cc`, `pointer`);
    form.reset();
    formData = new FormData(form);
};