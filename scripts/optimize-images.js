const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../public/transitions2");
const outputDir = path.join(__dirname, "../public/transitions2-optimized");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading input directory:", err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith(".png")) {
      const inputFile = path.join(inputDir, file);
      const outputFile = path.join(outputDir, file.replace(".png", ".webp"));

      sharp(inputFile)
        .resize({ width: 1920 }) // Ensure 1080p width
        .webp({ quality: 80, effort: 6 }) // High quality, max compression effort
        .toFile(outputFile)
        .then(() => {
          console.log(`Optimized: ${file}`);
        })
        .catch((err) => {
          console.error(`Error optimizing ${file}:`, err);
        });
    }
  });
});
