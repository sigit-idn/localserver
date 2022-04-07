// Create WATERMARK

document.body.innerHTML += (
  `<h1 style="
    font-weight   : 900;
    font-size     : 80px;
    opacity       : .2;
    position      : fixed;
    right         : 50%;
    top           : 50%;
    transform     : translate(50%, -50%);
    pointer-events: none;
    z-index       : 999;
  ">${prompt("watermark", "SAMPLE")}</h1>`
)