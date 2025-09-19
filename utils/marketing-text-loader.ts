// app/utils/marketing-text-loader.ts

import fs from "fs";
import path from "path";

/**
 * Loads marketing texts from the YAML file and returns them as an array of strings.
 * Assumes the YAML file is a simple list of strings (one per line, prefixed with '- ').
 */
function loadMarketingTexts(): string[] {
  const filePath = path.join(process.cwd(), "app/data/marketing-text.yml");
  const fileContent = fs.readFileSync(filePath, "utf8");
  // Simple YAML array parser: lines starting with '- '
  return fileContent
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.startsWith("- "))
    .map(line => line.replace(/^- /, "").replace(/^["']|["']$/g, ""));
}

/**
 * Returns a random marketing text from the YAML file.
 */
export function getRandomMarketingText(): string {
  const texts = loadMarketingTexts();
  if (texts.length === 0) return "";
  const idx = Math.floor(Math.random() * texts.length);
  return texts[idx];
}