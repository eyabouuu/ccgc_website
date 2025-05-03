import mongoose from "mongoose";

const centreSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Matches ObjectId like '67e82256b93c0f4b0a5013c9'
  id_centre: Number,
  Centre: String,
  Nom_Centre: String,
  Gouvernorat: String,
});

// Explicitly specify collection name to match 'centre'
export default mongoose.model("centre", centreSchema, "centre");