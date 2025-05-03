import fs from "fs";
import path from "path";

const sourceDir = "./models"; // Directory containing JavaScript files
const outputFile = "./combined.js"; // Output file

// Read all .js files from the directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const jsFiles = files.filter(file => file.endsWith(".js"));

  let combinedContent = "";

  jsFiles.forEach(file => {
    const filePath = path.join(sourceDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    combinedContent += `\n// --------- ${file} ---------\n${content}\n`;
  });

  // Write to a single file
  fs.writeFileSync(outputFile, combinedContent, "utf8");
  console.log(`✅ JavaScript files merged into ${outputFile}`);
});
