//! STORE data
let input = prompt("商品データ")
let data;
(async () => {
	let descriptionInput = prompt("商品説明").replace(/"/g, "")
	let detailsInput = prompt("Details")
	let galleriesInput = prompt("Galleries")?.replace(/\w{15,20}|"/g, "")?.match(/\S+/g)
	data = new (function () {
		this.productNumber = input.match(/\d{0,2}[0-9a-z-]+\d*/i)?.[0];
		this.title = descriptionInput.match(/(?<=")(\S|\n)(?=\n{2,})/)?.[0] ?? "";
		this.description = descriptionInput.match(/(?<=\n{2,})(\S|\n)+(?="*)/)?.[0] ?? descriptionInput;
		this.price = Number(input.match(/(?<=\s)\d{4,5}(?=\s)/));
		this.priceNoTax = Math.ceil(this.price - this.price / 11);
		this.sizes = ["-"];
		this.details = detailsInput?.replace(/\w{15,20}/g, "")?.match(/\S+/g)
		this.galleries = galleriesInput?.map((gallery, i) => {
			if (gallery?.length <= 5) {
				return [gallery, galleriesInput[i + 1]]
			}
		}).filter(Boolean)
		this.specs = {}
		const specsInput = prompt("Specs")
			?.replace(/(?<="(.|\n)*)\n+(?=(.|\n)*")/g, "<br>")
			?.replace(/(<br>){2,}/g, "<br>")
			?.replace(/(?<="(.|\n)*)\s+(?=(.|\n)*")/g, "<space>")
			?.replace(/(?<=サイズ.+)\s/g, "<space>")
			?.replace(/"/g, "")

		specsInput.split(/\n/).forEach(row => {
			const [key, value] = row.split(/\s+/)
			this.specs[key] = value?.replace(/<space>/g, " ")
		})
		this.colors = input.match(/\S+(?=\s+\S+x\w{5})/ig)
		this.rakutenMobileCatchCopy = input.match(/(?<=SP\S+\s+).+\S/ig)?.[0];
		this.rakutenCatchCopy = input.match(/(?<=PC\S+\s+).+\S/ig)?.[0];
		this.rakutenProductName = input.match(/(?<=商品名\s+).+\S/g)?.[0];
	})()

	try {
		await fetch("http://localhost:8888/watmos", {
			method: "POST",
			"Content-Type": "application/json",
			body: JSON.stringify(data),
		})
		console.log("Written succesfuly")
	}
	catch (error) { console.error({ error }) };
})();