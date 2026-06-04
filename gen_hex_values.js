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
        drawLabel(70, label[0]);
        // drawLabel(70, `HEXA-GENERATOR | ${Math.round(1000 / deltaTime)} FPS`);
      } else {
        drawLabel(70, label[labelIndex]);
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
      // text_area.value = "Generating Hex-Values ...";

      text_area.value = "* This may take a while for large amounts ! *";
      // 1. Warten auf die performante Generierung
      const generatedResult = await genHexValues(
        amountInput.value,
        digitsInput.value,
      );

      // 2. Dem User sagen, dass der Browser jetzt das Riesenpaket rendert
      text_area.value = "Inserting Hex-Values into Textarea ...";

      // Genau einen Frame Pause einlegen, damit das Label gezeichnet werden kann
      await new Promise((resolve) => requestAnimationFrame(resolve));

      // 3. Erst JETZT den gigantischen Text in die Textarea einfügen (erzeugt den kurzen Lag)
      text_area.value = generatedResult;

      // 4. Erst wenn ALLES fertig ist, die Buttons wieder freigeben
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
  }

  async function genHexValues(amount, digits) {
    btnsActive = false;
    labelIndex = 1;
    const hexValues = [];

    // 1. DAZUGEKOMMEN: digits sicher als Zahl parsen & den Byte-Puffer bereitstellen
    const numDigits = parseInt(digits);
    const randomBuffer = new Uint8Array(numDigits);

    for (let i = 0; i < amount; i++) {
      // 2. DAZUGEKOMMEN: Puffer mit krypto-sicheren Zufallsbytes füllen
      window.crypto.getRandomValues(randomBuffer);

      // Das 'do-while' und die Duplikat-Variablen sind komplett weggefallen!
      let newHexValue = prefix;

      for (let j = 0; j < numDigits; j++) {
        // 3. DAZUGEKOMMEN: Jedes Byte über Modulo (%) auf dein values-Alphabet mappen
        const randomIndex = randomBuffer[j] % values.length;
        newHexValue += values[randomIndex];
      }

      hexValues.push(newHexValue);

      // ⚠️ i % Value bestimmt die Geschwindigkeit des Algorithmus. Je höher der Wert, desto schneller der Algo
      if (i % 50 === 0) {
        // Perfekte FPS-Synchronisation über die Grafikkarte
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }

    // ACHTUNG: btnsActive wird absichtlich erst im Click-Listener nach dem Textarea-Load wieder true!
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
