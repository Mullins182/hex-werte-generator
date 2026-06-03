console.log("gen_hex_values.js successfully loaded ...");

// ----------------- HEX-WERTE GENERATOR @Mullins182 (17.08.2025) -----------------

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const label = ["HEXA-GENERATOR"];
  const amountInput = document.getElementById("amount-input");
  const digitsInput = document.getElementById("digits-input");
  const genBtn = document.getElementById("gen-btn");
  const copyBtn = document.getElementById("copy-btn");
  let btnsActive = true;
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.1;
  const ctx = canvas.getContext("2d");
  const text_area = document.getElementById("output");
  const prefix = "0x";
  const values = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  // -------------- TOP LEVEL CODE -----------------
  // amountInput.value = amountInput.value <= 0 ? 10 : amountInput.value;
  // digitsInput.value = digitsInput.value <= 0 ? 6 : digitsInput.value;
  drawLabel(70, label);

  // GEN Button Event Listener
  genBtn.addEventListener("click", () => {
    if (btnsActive) {
      text_area.value = genHexValues(amountInput.value, digitsInput.value);
    }
  });
  // Copy Button Event Listener
  copyBtn.addEventListener("click", () => {
    if (btnsActive) {
      const text = text_area.value;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          text_area.value !== ""
            ? alert("Hex values copied to clipboard!")
            : null;
        })
        .catch((err) => {
          console.error("Failed to copy ! ", err);
        });
    }
  });
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.1;
    drawLabel(70, label);
  });

  function drawLabel(size, label) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${size}px Comic Sans Ms, sans-serif`;
    ctx.fontWeight = "bold";
    ctx.strokeStyle = "darkgoldenrod";
    ctx.lineWidth = 2;
    ctx.fillStyle = "darkgoldenrod";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(label, canvas.width / 2, canvas.height / 1.6);
    // ctx.fillText(label, canvas.width / 2, canvas.height / 1.6);
  }

  function genHexValues(amount, digits) {
    btnsActive = false;
    const hexValues = [];
    const hexValuesSet = new Set();

    for (let i = 0; i < amount; i++) {
      let newHexValue;
      let isDuplicate;

      do {
        let row = [prefix];
        for (let j = 0; j < digits; j++) {
          const randomIndex = Math.floor(Math.random() * values.length);
          row.push(values[randomIndex]);
        }
        newHexValue = row.join("");
        isDuplicate = hexValuesSet.has(newHexValue);
      } while (isDuplicate);

      hexValues.push(newHexValue);
      hexValuesSet.add(newHexValue);
    }

    btnsActive = true;
    return hexValues.join("\n");
  }

  // ----------------- HEXAGONS -----------------

  // const canvas = document.getElementById("canvas");
  // const ctx = canvas.getContext("2d");

  // function drawHexagon(x, y, size) {
  //   ctx.beginPath();
  //   for (let i = 0; i < 6; i++) {
  //     const angle = (Math.PI / 3) * i;
  //     const xOffset = size * Math.cos(angle);
  //     const yOffset = size * Math.sin(angle);
  //     ctx.lineTo(x + xOffset, y + yOffset);
  //   }
  //   ctx.closePath();
  //   ctx.stroke();
  // }

  // function generateHexagons(rows, cols, size) {
  //   for (let row = 0; row < rows; row++) {
  //     for (let col = 0; col < cols; col++) {
  //       const x = col * size * 1.5;
  //       const y = row * size * Math.sqrt(3);
  //       if (col % 2 === 1) {
  //         y += (size * Math.sqrt(3)) / 2;
  //       }
  //       drawHexagon(x, y, size);
  //     }
  //   }
  // }

  // generateHexagons(50, 50, 500);
});
