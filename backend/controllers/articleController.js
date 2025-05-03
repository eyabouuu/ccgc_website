import AchatsVenteFact from "../models/achats_vente_fact.js";

export const getSalesByArticleType = async (req, res) => {
  try {
    const salesData = await AchatsVenteFact.aggregate([
      {
        $group: {
          _id: "$Code_article", // Group by Code_article
          totalSales: { $sum: "$mont_ttc" }, // Sum mont_ttc for each Code_article
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the output
          article: "$_id", // Rename _id to article
          sales: "$totalSales", // Rename totalSales to sales
        },
      },
    ]);

    res.status(200).json(salesData);
  } catch (error) {
    console.error("Error fetching sales by article type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getArticlePerformance = async (req, res) => {
  try {
    const performanceData = await AchatsVenteFact.aggregate([
      {
        $group: {
          _id: "$Code_article", // Group by Code_article
          mnt_base: { $sum: "$mnt_base" }, // Sum of mnt_base
          mnt_bonif: { $sum: "$mnt_bonif" }, // Sum of mnt_bonif
          mont_ttc: { $sum: "$mont_ttc" }, // Sum of mont_ttc
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the output
          article: "$_id", // Rename _id to article
          mnt_base: 1, // Include mnt_base
          mnt_bonif: 1, // Include mnt_bonif
          mont_ttc: 1, // Include mont_ttc
        },
      },
    ]);

    res.status(200).json(performanceData);
  } catch (error) {
    console.error("Error fetching article performance data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
