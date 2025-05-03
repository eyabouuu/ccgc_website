import mongoose from "mongoose";

const livraison_factSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Mixed, // Allows any type for _id (e.g., string, ObjectId)
  id_livr: Number,
  id_meteo: Number,
  date_livraison: String,
  date_facturation: String,
  Code_tiers: String,
  Centre: String,
  ETAT: String,
  MNT_TTC: Number,
  MNT_BRUT: Number,
  MONT_REG: Number,
});

export default mongoose.model("livraison_fact", livraison_factSchema);