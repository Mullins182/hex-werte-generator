console.log("gen_hex_values.js successfully loaded ...");

// ----------------- HEX-WERTE GENERATOR @Mullins182 (17.08.2025) -----------------

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  let label = [
    "HEXA-GENERATOR",
    "GENERATING HEX VALUES ",
    " GENERATING HEX VALUES .",
    "  GENERATING HEX VALUES ..",
    "   GENERATING HEX VALUES ...",
  ];
  let labelIndex = 1;
  const amountInput = document.getElementById("amount-input");
  const digitsInput = document.getElementById("digits-input");
  const genBtn = document.getElementById("gen-btn");
  const copyBtn = document.getElementById("copy-btn");
  let btnsActive = true;
  const canvas = document.getElementById("canvas");

  // Initialisierungs-Größe des Canvas
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

  requestAnimationFrame(program_loop);

  async function program_loop(timestamp) {
    const deltaTime = timestamp - (program_loop.lastTimestamp || 0);

    if (deltaTime >= 1000 / 3) {
      if (btnsActive) {
        // FIX: Kein hartcodiertes "70" mehr übergeben!
        drawLabel(label[0]);
      } else {
        // FIX: Kein hartcodiertes "70" mehr übergeben!
        drawLabel(label[labelIndex]);
        labelIndex += 1;
        if (labelIndex >= label.length) {
          labelIndex = 1;
        }
      }
      program_loop.lastTimestamp = timestamp;
    }
    requestAnimationFrame(program_loop);
  }

  // GEN Button Event Listener
  genBtn.addEventListener("click", async () => {
    if (btnsActive) {
      if (amountInput.value > 150000 || digitsInput.value < 1) {
        text_area.value =
          "Amount must not be higher than 150.000 ! \nDigits must be at least 1 !";
        return;
      }

      text_area.value = "* May take a while ! *";
      const generatedResult = await genHexValues(
        amountInput.value,
        digitsInput.value,
      );

      text_area.value = "Inserting Hex-Values...";
      await new Promise((resolve) => requestAnimationFrame(resolve));
      text_area.value = generatedResult;
      btnsActive = true;
    }
  });

  // Copy Button Event Listener
  copyBtn.addEventListener("click", () => {
    if (btnsActive) {
      const text = text_area.value;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          text_area.value !== "" ? alert("Content copied to Clipboard!") : null;
        })
        .catch((err) => {
          console.error("Failed to copy ! ", err);
        });
    }
  });

  // FIX: Der Resize-Listener aktualisiert nur noch die Maße.
  // Da die "program_loop" permanent läuft, zeichnet sie das Canvas im nächsten Frame automatisch neu!
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.1;
  });

  // FIX: Diese Funktion berechnet die Schriftgröße jetzt dynamisch selbst!
  // JETZT PERFEKT RESPONSIV: Text füllt immer die volle Breite aus!
  function drawLabel(textString) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Gewünschten Abstand zum Rand definieren (z.B. insgesamt 40px -> 20px links und rechts)
    const padding = 40;
    const targetWidth = canvas.width - padding;

    // 2. Eine Basis-Schriftgröße setzen, um die relative Breite des Textes zu messen
    const baseFontSize = 100;
    ctx.font = `bold ${baseFontSize}px "Comic Sans MS", sans-serif`;
    const measuredWidth = ctx.measureText(textString).width;

    // 3. Dreisatz: Berechne die exakte Schriftgröße für die volle Breite
    let dynamicFontSize = (targetWidth / measuredWidth) * baseFontSize;

    // 4. Sicherheitsnetz: Der Text soll natürlich nicht höher als das Canvas selbst werden
    // (max. 85% der Canvas-Höhe, damit es oben/unten nicht anstößt)
    const maxFontSize = canvas.height * 0.85;
    if (dynamicFontSize > maxFontSize) {
      dynamicFontSize = maxFontSize;
    }

    // 5. Die perfekt berechnete Größe anwenden und zeichnen
    ctx.font = `bold ${dynamicFontSize}px "Comic Sans MS", sans-serif`;
    ctx.strokeStyle = "darkgoldenrod";
    ctx.lineWidth = dynamicFontSize > 30 ? 2 : 1; // Dünnere Linie auf kleinen Handys, damit es nicht matcht
    ctx.fillStyle = "darkgoldenrod";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.strokeText(textString, canvas.width / 2, canvas.height / 2);
  }

  async function genHexValues(amount, digits) {
    btnsActive = false;
    labelIndex = 1;
    const hexValues = [];
    const numDigits = parseInt(digits);
    const randomBuffer = new Uint8Array(numDigits);

    for (let i = 0; i < amount; i++) {
      window.crypto.getRandomValues(randomBuffer);
      let newHexValue = prefix;

      for (let j = 0; j < numDigits; j++) {
        const randomIndex = randomBuffer[j] % values.length;
        newHexValue += values[randomIndex];
      }

      hexValues.push(newHexValue);

      // Hier behalten wir deinen Modulo-Wert für die Render-Pausen bei
      if (i % 50 === 0) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }
    return hexValues.join("\n");
  }
});
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
