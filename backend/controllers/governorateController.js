import mongoose from "mongoose";
import Centre from "../models/centre.js"; // Adjust path as per your project structure
import AchatsVenteFact from "../models/achats_vente_fact.js";
import Meteoo from "../models/meteoo.js";

// Controller to fetch top 5 governorates by average temperature
export const getTopGovernoratesByTemp = async (req, res) => {
  try {
    const topGovernorates = await Centre.aggregate([
      // Step 1: Join with achats_vente_fact on Centre field
      {
        $lookup: {
          from: "achats_vente_fact", // Collection name in MongoDB
          localField: "Centre",
          foreignField: "Centre",
          as: "achats",
        },
      },
      // Step 2: Unwind achats array to process each document
      { $unwind: { path: "$achats", preserveNullAndEmptyArrays: true } },
      // Step 3: Join with meteoo on id_meteo
      {
        $lookup: {
          from: "meteoo",
          localField: "achats.id_meteo",
          foreignField: "id_meteo",
          as: "meteo",
        },
      },
      // Step 4: Unwind meteo array
      { $unwind: { path: "$meteo", preserveNullAndEmptyArrays: true } },
      // Step 5: Group by Gouvernorat and calculate average temperature
      {
        $group: {
          _id: "$Gouvernorat",
          avgTemp: { $avg: "$meteo.tavg" },
        },
      },
      // Step 6: Filter out null or undefined Gouvernorat and invalid avgTemp
      {
        $match: {
          _id: { $ne: null },
          avgTemp: { $ne: null },
        },
      },
      // Step 7: Sort by avgTemp in descending order
      { $sort: { avgTemp: -1 } },
      // Step 8: Limit to top 5
      { $limit: 5 },
      // Step 9: Project to shape the output
      {
        $project: {
          governorate: "$_id",
          averageTemperature: { $round: ["$avgTemp", 2] }, // Round to 2 decimals
          _id: 0,
        },
      },
    ]);

    if (!topGovernorates.length) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(topGovernorates);
  } catch (error) {
    console.error("Error fetching top governorates:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};