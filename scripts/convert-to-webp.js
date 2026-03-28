import sharp from "sharp";
import { readdirSync } from "fs";
import { join, extname, basename } from "path";

const publicDir = "./public";
const files = readdirSync(publicDir).filter((file) => extname(file) === ".png");

for (const file of files) {
  const input = join(publicDir, file);
  const output = join(publicDir, `${basename(file, ".png")}.webp`);
  await sharp(input).webp({ quality: 80 }).toFile(output);
  console.log(`✓ ${file} → ${basename(file, ".png")}.webp`);
}
