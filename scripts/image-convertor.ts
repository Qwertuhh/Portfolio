/**
 * Copyright (c) 2025 Arihant Jain, Qwertuhh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Image File Converter Script
 *
 * Converts all images from the input directory to WebP format using Sharp.
 * This script processes JPEG, PNG, and WebP files.
 *
 * @module scripts/image-convertor
 * @version 2.0.0
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";
import c from "ansi-colors";

// * ===== CONFIGURATION =====
/** Input directory containing raw image files */
const INPUT_DIR = "../raw";
/** Output directory for converted WebP files */
const OUTPUT_DIR = "../public";
/** Target image format for conversion */
const TARGET_FORMAT = "webp";
/** Supported image file extensions */
const SUPPORTED_EXT = [".jpg", ".jpeg", ".png", ".webp"];
// * =========================

/**
 * Ensures a directory exists, creating it if necessary.
 * @param dir - Directory path to create
 */
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(c.dim(`Created directory: ${dir}`));
  }
}

/**
 * Recursively finds all image files in a directory.
 * @param dir - Directory to search
 * @returns Array of image file paths
 */
function getAllImageFiles(dir: string): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let results: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        results = results.concat(getAllImageFiles(fullPath));
      } else if (
        SUPPORTED_EXT.includes(path.extname(entry.name).toLowerCase())
      ) {
        results.push(fullPath);
      }
    }

    return results;
  } catch (error) {
    console.error(c.red(`Error reading directory ${dir}:`), error);
    return [];
  }
}

/**
 * Main function that orchestrates the image conversion process.
 */
async function main(): Promise<void> {
  console.log(c.blue.bold("Image Converter Script Started"));
  console.log(c.dim(`Input:  ${path.resolve(INPUT_DIR)}`));
  console.log(c.dim(`Output: ${path.resolve(OUTPUT_DIR)}`));
  console.log("");

  // Validate input directory
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(c.red.bold("Error: Input directory does not exist!"));
    process.exit(1);
  }

  ensureDir(OUTPUT_DIR);

  const imageFiles = getAllImageFiles(INPUT_DIR);

  if (imageFiles.length === 0) {
    console.log(c.yellow("No image files found to convert."));
    return;
  }

  console.log(c.blue(`Found ${imageFiles.length} image file(s):`));
  imageFiles.forEach((file) =>
    console.log(c.dim(`  • ${path.basename(file)}`))
  );
  console.log("");

  let successCount = 0;
  let errorCount = 0;

  // Process files sequentially with progress tracking
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    try {
      // Convert image synchronously for better control
      const inputPath = file;
      const outputPath = path.join(
        OUTPUT_DIR,
        `${path.parse(file).name}.${TARGET_FORMAT}`
      );

      // Skip files that are already in target format
      if (path.extname(file).toLowerCase() === `.${TARGET_FORMAT}`) {
        console.log(
          c.yellow(
            `[${i + 1}/${imageFiles.length}] Skipping ${TARGET_FORMAT} file:`
          ),
          c.italic(path.basename(file))
        );
        successCount++;
        continue;
      }

      console.log(
        c.cyan(`[${i + 1}/${imageFiles.length}] Converting:`),
        c.bold(path.basename(file)),
        c.dim(`→ ${path.basename(outputPath)}`)
      );

      await sharp(inputPath)
        .webp({
          quality: 100,
          lossless: false,
          effort: 4,
        })
        .toFile(outputPath);

      console.log(
        c.green(`[${i + 1}/${imageFiles.length}] Done:`),
        c.bold(path.basename(outputPath))
      );

      successCount++;
    } catch (error) {
      console.log(
        c.red(`[${i + 1}/${imageFiles.length}] Failed:`),
        c.bold(path.basename(file))
      );
      console.error(c.dim(`   Error: ${error}`));
      errorCount++;
    }
  }

  // Summary
  console.log("");
  console.log(c.green.bold("Conversion Summary:"));
  console.log(c.green(`Successful: ${successCount}`));
  if (errorCount > 0) {
    console.log(c.red(`Failed: ${errorCount}`));
  }
  console.log(c.blue(`Total processed: ${imageFiles.length}`));

  if (errorCount === 0) {
    console.log(c.green.bold("\nAll conversions completed successfully!"));
  }
}

// Handle process errors gracefully
process.on("uncaughtException", (error) => {
  console.error(c.red.bold("Uncaught Exception:"), error);
  process.exit(1);
});

// Start the main function
main().catch((error) => {
  console.error(c.red.bold("Script failed:"), error);
  process.exit(1);
});
