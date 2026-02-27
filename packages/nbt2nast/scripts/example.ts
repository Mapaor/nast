import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { nbt2nast } from "../src/index.js";
import type { NBTDocument } from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPageId = "30511a9761ab802c808cdbb05b786986";

async function main() {
  try {
    // Read the input NBT JSON file
    const inputPath = resolve(__dirname, "../input", `nbt-page-${inputPageId}.json`);
    console.log("Reading NBT from:", inputPath);
    
    const nbtJson = readFileSync(inputPath, "utf-8");
    const nbt: NBTDocument = JSON.parse(nbtJson);

    // Convert NBT to NAST
    console.log("Converting NBT to NAST...");
    const nast = nbt2nast(nbt);
    // const nast = nbt2nast(nbt, { preserveBlockId: true });

    // Write the output NAST JSON file
    const outputPath = resolve(__dirname, "../output", `nast-page-${inputPageId}.json`);
    console.log("Writing NAST to:", outputPath);
    
    writeFileSync(outputPath, JSON.stringify(nast, null, 2), "utf-8");

    console.log("Conversion completed successfully!");
    console.log(`- Input: ${inputPath}`);
    console.log(`- Output: ${outputPath}`);
    console.log(`- Page title: ${nast.data.title}`);
    console.log(`- Number of root nodes: ${nast.children.length}`);
  } catch (error) {
    console.error("Error during conversion:", error);
    process.exit(1);
  }
}

// Run the example
main();
