import mongoose from "mongoose";

const achats_vente_factSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Mixed, // Allows any type for _id (e.g., string, ObjectId)
  id_achat1: Number,
  id_meteo: Number,
  date_operation: String,
  Code_tiers: String,
  Centre: String,
  Code_article: String,
  code_operation: String,
  id_junk: Number,
  qte_article: Number,
  mnt_base: Number,
  mnt_bonif: Number,
  mnt_refact: Number,
  mnt_prime: Number,
  mnt_taxe: Number,
  mont_ttc: Number,
});

// Explicitly specify collection name to match 'achats_vente_fact'
export default mongoose.model("achats_vente_fact", achats_vente_factSchema, "achats_vente_fact");