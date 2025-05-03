import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Mixed, // Allows any type for _id (e.g., string, ObjectId)
  id: Number,
  code_tiers: String,
  nom_afftiers: String,
  type_client: String,
});

export default mongoose.model("clients", clientsSchema);