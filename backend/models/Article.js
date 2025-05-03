import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Mixed, // Allows any type for _id (e.g., string, ObjectId)
  Id_article: Number, // Changed to proper type
  Code_article: String, // Changed to proper type
  Lib_article: String, // Changed to proper type
  Cod_fam: String, // Changed to proper type
});

export default mongoose.model("article", articleSchema);