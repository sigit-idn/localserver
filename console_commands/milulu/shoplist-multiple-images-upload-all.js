//! Shoplist MULTIPLE image upload

let tbody = document.querySelector("#main > form > table > tbody");
let form = document.querySelector("form");
let formDataArray = [];

tbody.querySelectorAll("input[type=file]").forEach((uploadInput) => {
    uploadInput.multiple = true;
    uploadInput.addEventListener("change", () => {
        const files = [...uploadInput.files];

        const groups = files.reduce((acc, file, i) => {
            const group = Math.floor(i / 20);
            if (!acc[group]) acc[group] = [];
            acc[group].push(file);
            return acc;
        }, []);

        groups.forEach((group) => {
            const groupForm = form.cloneNode(true);
            const formData = new FormData(groupForm);
            formDataArray.push(formData);
            group.forEach((file, i) => {
                formData.append(`upload_image[${i + 2}]`, file);
            });
        });
        console.log({ groups, formDataArray });
    });
});

form.onsubmit = async(event) => {
    event.preventDefault();
    const submitButton = document.querySelector('[href="#Submit"]')
    submitButton.innerHTML = `アップロード中...`;
    submitButton.style.backgroundColor = `#3338`;
    submitButton.style.cursor = `wait`;

    const closeWindow = () => {
        if (confirm("アップロード完了!\nウィンドウ閉じる？")) return window.close();
        submitButton.innerHTML = `アップロード`;
        submitButton.style.backgroundColor = `#0066cc`;
        submitButton.style.cursor = `pointer`;
        form.reset();
        formDataArray = [];
    };

    const response = await fetch(form.action, {
        method: "POST",
        body: formDataArray[0],
    });

    if (!response.ok) return console.error(response);

    if (!formDataArray[1]) return closeWindow();

    const response2 = await fetch(form.action, {
        method: "POST",
        body: formDataArray[1],
    });

    if (!response2.ok) return console.error(response2);

    closeWindow();
}