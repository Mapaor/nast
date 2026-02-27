import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { nbt2nast } from "../src/index.js";
import type { NBTDocument } from "../src/index.js";


function main() {
  const inputPath = "input/nbt-30511a9761ab802c808cdbb05b786986.json";
  const outputPath = "output/nast-30511a9761ab802c808cdbb05b786986.json";

  try {
    console.log("Reading NBT from:", inputPath);
    const nbtJson = readFileSync(inputPath, "utf-8");
    const nbt: NBTDocument = JSON.parse(nbtJson);

    console.log("Converting NBT to NAST...");
    const nast = nbt2nast(nbt);

    console.log("Writing NAST to:", outputPath);
    writeFileSync(outputPath, JSON.stringify(nast, null, 2), "utf-8");

    console.log("Conversion completed successfully!");
    console.log(`Page: ${nast.data.title}`);
    console.log(`Root nodes: ${nast.children.length}`);
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
