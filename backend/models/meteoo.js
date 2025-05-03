import mongoose from "mongoose";

const meteooSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Mixed, // Allows any type for _id (e.g., string, ObjectId)
  id_meteo: Number,
  date: String,
  tavg: Number,
  tmin: Number,
  tmax: Number,
  prcp: Number,
  wspd: Number,
  station: String,
});

export default mongoose.model("meteoo", meteooSchema);