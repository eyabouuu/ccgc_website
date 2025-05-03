import achatsVenteFact from "../models/achats_vente_fact.js";

export const getTransactionTypesDistribution = async (req, res) => {
  try {
    const total = await achatsVenteFact.countDocuments(); // Get the total count of documents

    const distribution = await achatsVenteFact.aggregate([
      {
        $group: {
          _id: "$code_operation",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: { $round: [{ $multiply: [{ $divide: ["$count", total] }, 100] }, 2] }, // Calculate percentage
        },
      },
    ]);

    res.status(200).json(distribution);
  } catch (error) {
    console.error("Error fetching transaction types distribution:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};