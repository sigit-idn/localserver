// search on focus

document.body.onfocus = async () => {
  const searchText = await navigator.clipboard.readText();

  if (searchText) {
    document.querySelectorAll('u')
      .forEach((u) => {
        searchTexts = searchText.match(/\S+/g);

        if (eval(searchTexts.map((text) => `u.innerText.includes("${text}")`).join("&&"))) {

          u.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });

          u.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
        }
      })
  }
}