import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// MongoDB connection
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function extractSchemas() {
  try {
    await client.connect();
    const db = client.db("eya_pfe"); 
    const collections = await db.listCollections().toArray();

    for (const collection of collections) {
      const name = collection.name;
      const sampleDocs = await db.collection(name).find({}).limit(5).toArray();

    
      const schema = {};
      sampleDocs.forEach((doc) => {
        Object.keys(doc).forEach((key) => {
          schema[key] = typeof doc[key];
        });
      });

      // Mongoose model as a string
      const modelContent = `
      import mongoose from "mongoose";

      const ${name}Schema = new mongoose.Schema(${JSON.stringify(schema, null, 2)});

      export default mongoose.model("${name}", ${name}Schema);
      `;

      // Ensure models folder exists
      const modelsDir = path.resolve("models");
      if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir);
      }

      // Save model
      fs.writeFileSync(`${modelsDir}/${name}.js`, modelContent, "utf8");
      console.log(`Schema for ${name} saved!`);
    }
  } catch (error) {
    console.error("Error extracting schemas:", error);
  } finally {
    await client.close();
  }
}

extractSchemas();
