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
 * Audio File Converter Script
 *
 * Converts all audio files from the input directory to OGG format using FFmpeg.
 * This script processes WAV, MP3, M4A, MP4, AAC, FLAC, AIFF, and OGG files.
 *
 * @module scripts/audio-convertor
 * @version 3.0.0
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import colors from "ansi-colors";

const c = colors;

// * ===== CONFIGURATION =====
/** Input directory containing raw audio files */
const INPUT_DIR = path.resolve("../raw/audio");
/** Output directory for converted OGG files */
const OUTPUT_DIR = path.resolve("../public/sfx");
/** Target audio format for conversion */
const TARGET_FORMAT = "ogg";
/** Supported audio file extensions */
const AUDIO_EXTENSIONS = new Set([
  ".wav",
  ".mp3",
  ".m4a",
  ".mp4",
  ".aac",
  ".flac",
  ".aiff",
  ".ogg",
]);
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
 * Recursively finds all audio files in a directory.
 * @param dir - Directory to search
 * @returns Array of audio file paths
 */
function getAllAudioFiles(dir: string): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let results: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        results = results.concat(getAllAudioFiles(fullPath));
      } else if (AUDIO_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
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
 * Converts a single audio file to OGG format using direct FFmpeg command.
 * @param inputFile - Path to the input audio file
 * @param index - Current file index for progress display
 * @param total - Total number of files to process
 * @returns Success status
 */
function convertAudio(
  inputFile: string,
  index: number,
  total: number
): boolean {
  try {
    // Skip files that are already in target format
    if (path.extname(inputFile).toLowerCase() === `.${TARGET_FORMAT}`) {
      console.log(
        c.yellow(`[${index + 1}/${total}] ↷ Skipping ${TARGET_FORMAT} file:`),
        c.italic(path.basename(inputFile))
      );
      return true;
    }

    const relativePath = path.relative(INPUT_DIR, inputFile);
    const outputPath = path.join(
      OUTPUT_DIR,
      relativePath.replace(path.extname(relativePath), `.${TARGET_FORMAT}`)
    );

    ensureDir(path.dirname(outputPath));

    console.log(
      c.cyan(`[${index + 1}/${total}] ▶ Converting:`),
      c.bold(path.basename(inputFile)),
      c.dim(`→ ${path.basename(outputPath)}`)
    );

    // Suppress FFmpeg output for cleaner terminal experience
    execSync(`ffmpeg -y -i "${inputFile}" "${outputPath}"`, {
      stdio: ["pipe", "pipe", "pipe"],
      encoding: "utf8",
    });

    console.log(
      c.green(`[${index + 1}/${total}] ✔ Done:`),
      c.bold(path.basename(outputPath))
    );

    return true;
  } catch (error) {
    console.log(
      c.red(`[${index + 1}/${total}] ✖ Failed:`),
      c.bold(path.basename(inputFile))
    );
    console.error(c.dim(`   Error: ${error}`));
    return false;
  }
}

/**
 * Main function that orchestrates the audio conversion process.
 */
function main(): void {
  console.log(c.blue.bold("🎵 Audio Converter Script Started"));
  console.log(c.dim(`Input:  ${INPUT_DIR}`));
  console.log(c.dim(`Output: ${OUTPUT_DIR}`));
  console.log("");

  // Validate input directory
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(c.red.bold("Error: Input directory does not exist!"));
    process.exit(1);
  }

  ensureDir(OUTPUT_DIR);

  const audioFiles = getAllAudioFiles(INPUT_DIR);

  if (audioFiles.length === 0) {
    console.log(c.yellow("No audio files found to convert."));
    return;
  }

  console.log(c.blue(`Found ${audioFiles.length} audio file(s):`));
  audioFiles.forEach((file) =>
    console.log(c.dim(`  • ${path.basename(file)}`))
  );
  console.log("");

  let successCount = 0;
  let errorCount = 0;

  // Process files with progress tracking
  for (let i = 0; i < audioFiles.length; i++) {
    const file = audioFiles[i];
    if (convertAudio(file, i, audioFiles.length)) {
      successCount++;
    } else {
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
  console.log(c.blue(`Total processed: ${audioFiles.length}`));

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
main();
