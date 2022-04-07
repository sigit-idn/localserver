//! Shoplist VARIATION

let { sizes, colors, productNumber, colorCode } = await (await fetch("http://localhost:8888/milulu")).json();

document
  .querySelectorAll("input[name^=product_axis_width_name]")
  .forEach((size, i) => (size.value = sizes[i] || ""));

document
  .querySelectorAll("input[name^=product_width_child_no]")
  .forEach((size, i) => {
    size.value = sizes[i]?.replace(/号/g, "") ?? "";
    size.value = size.value.length == 1 ? "0" + size.value : size.value;
    size.value = !sizes[i]?.includes("フリー") ? (size.value.match(/\d{2}(?=(\D|$))/)?.[0] ?? "") : "fl";
  });

document
  .querySelectorAll("input[name^=product_axis_height_name]")
  .forEach((color, i) => (color.value = colors[i] || ""));

document
  .querySelectorAll("input[name^=product_height_child_no]")
  .forEach((color, i) => (color.value = colorCode[colors[i]] || ""));

document
  .querySelectorAll("input[name^=color_image_url]")
  .forEach(
    (color, i) =>
    (color.value =
      i < colors.length
        ? `http://img.shop-list.com/res/up/shoplist/shp/milulu/${productNumber}/${productNumber.toLowerCase()}-parts${i + 1
        }.jpg`
        : "")
  );

document
  .querySelectorAll("select[name^=product_color_id]")
  .forEach(
    (select, i) =>
    (select.value = [...select.querySelectorAll("option")].filter((option) =>
      option.label?.includes(colors[i] || colors[i].slice(3, 6))
    )[0]?.value)
  ) || "";

