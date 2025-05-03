import mongoose from "mongoose";
import AchatsVenteFact from "../models/achats_vente_fact.js"; // Adjust path as needed
import Centre from "../models/centre.js"; // Adjust path as needed
import clients from "../models/clients.js";
export const getTopCentersByYear = async (req, res) => {
  try {
    const { year } = req.query;
    console.log("Requested year:", year);

    // Validate year
    if (!year || isNaN(year) || year < 2021 || year > 2025) {
      console.log("Invalid year detected");
      return res.status(400).json({ message: "Please provide a valid year between 2021 and 2025" });
    }

    // Step 1: Fetch top 5 achats_vente_fact by mont_ttc for the year
    const topSales = await AchatsVenteFact.find({
      date_operation: { $regex: `^${year}`, $options: "i" }, // Case-insensitive
      Centre: { $exists: true, $ne: null, $ne: "" }, // Ensure valid Centre
      mont_ttc: { $exists: true, $ne: null }, // Ensure valid mont_ttc
    })
      .sort({ mont_ttc: -1 }) // Sort by mont_ttc descending
      .limit(5)
      .select("Centre mont_ttc"); // Only fetch needed fields
    console.log("Top sales records:", JSON.stringify(topSales, null, 2));

    // Step 2: Extract Centre codes
    const centerCodes = topSales
      .map((sale) => sale.Centre)
      .filter((code) => code != null && code !== "");
    console.log("Center codes:", centerCodes);

    // Step 3: Fetch centre details
    let centerDetails = [];
    if (centerCodes.length > 0) {
      centerDetails = await Centre.find({
        Centre: { $in: centerCodes },
      }).select("Centre Gouvernorat").lean(); // Fetch Gouvernorat instead of Nom_Centre
      console.log("Center details:", JSON.stringify(centerDetails, null, 2));
    } else {
      console.log("No valid center codes to fetch");
    }

    // Step 4: Map results
    const result = topSales.map((sale) => {
      const centerInfo = centerDetails.find((c) => c.Centre === sale.Centre);
      return {
        center: centerInfo && centerInfo.Gouvernorat ? centerInfo.Gouvernorat : sale.Centre || "Unknown",
        amount: sale.mont_ttc,
      };
    });
    console.log("Final result:", JSON.stringify(result, null, 2));

    if (result.length === 0) {
      console.log("Warning: Result is empty");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching top centers:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getTopClientsByTotalMontTTC = async (req, res) => {
    try {
      // Step 1: Aggregate achats_vente_fact to sum mont_ttc by Code_tiers
      const salesByClient = await AchatsVenteFact.aggregate([
        {
          $match: {
            Code_tiers: { $exists: true, $ne: null, $ne: "" }, // Ensure valid Code_tiers
            mont_ttc: { $exists: true, $ne: null }, // Ensure valid mont_ttc
          },
        },
        {
          $group: {
            _id: "$Code_tiers", // Group by Code_tiers
            totalMontTTC: { $sum: "$mont_ttc" }, // Sum mont_ttc
          },
        },
        {
          $sort: { totalMontTTC: -1 }, // Sort by totalMontTTC descending
        },
        {
          $limit: 5, // Limit to top 5
        },
      ]);
      console.log("Aggregated sales by client:", JSON.stringify(salesByClient, null, 2));
  
      // Step 2: Extract Code_tiers
      const clientCodes = salesByClient
        .map((sale) => sale._id)
        .filter((code) => code != null && code !== "");
      console.log("Client codes:", clientCodes);
  
      // Step 3: Fetch client details
      let clientDetails = [];
      if (clientCodes.length > 0) {
        clientDetails = await clients.find({
          code_tiers: { $in: clientCodes },
        }).select("code_tiers nom_afftiers").lean();
        console.log("Client details:", JSON.stringify(clientDetails, null, 2));
      } else {
        console.log("No valid client codes to fetch");
      }
  
      // Step 4: Map results
      const result = salesByClient.map((sale) => {
        const clientInfo = clientDetails.find((c) => c.code_tiers === sale._id);
        return {
            client: clientInfo && clientInfo.nom_afftiers ? clientInfo.nom_afftiers : sale._id || "Unknown",
            amount: sale.totalMontTTC,
          };
      });
      console.log("Final result:", JSON.stringify(result, null, 2));
  
      if (result.length === 0) {
        console.log("Warning: Result is empty");
      }
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching top clients:", error);
      res.status(500).json({ message: "Server error" });
    }
  };