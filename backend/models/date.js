import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Mixed, // Allows any type for _id (e.g., string, ObjectId)
  key_date: String,
  date: mongoose.Schema.Types.Mixed, // Allows flexibility for date object
  heure: String,
  jour: String,
  mois: String,
  annee: String,
});

export default mongoose.model("date", dateSchema);