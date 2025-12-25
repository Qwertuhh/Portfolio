import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "../raw"; // 👈 change here
const OUTPUT_DIR = "../public"; // 👈 change here

const SUPPORTED_EXT = [".jpg", ".jpeg", ".png", ".webp"];

async function convertToPng() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(INPUT_DIR);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (!SUPPORTED_EXT.includes(ext)) continue;

    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, `${path.parse(file).name}.webp`);

    try {
      await sharp(inputPath).webp({ quality: 100 }).toFile(outputPath);

      console.log(`✅ Converted: ${file} → ${outputPath}`);
    } catch (err) {
      console.error(`❌ Failed: ${file}`, err);
    }
  }

  console.log("🎉 Conversion complete");
}

convertToPng();
