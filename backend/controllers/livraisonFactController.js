import LivraisonFact from "../models/livraison_fact.js";

export const getLivraisonFactsByCodeTiers = async (req, res) => {
  try {
    // Extract Code_tiers from the request parameters
    const { code_tiers } = req.params;
    console.log("Code_tiers received from request:", code_tiers);

    // Fetch LivraisonFact records by Code_tiers (case-insensitive and trimmed)
    const livraisonFacts = await LivraisonFact.find({
      Code_tiers: { $regex: `^${code_tiers.trim()}$`, $options: "i" }
    });

    console.log("Query result:", livraisonFacts);

    // Send the result as a response
    res.status(200).json(livraisonFacts);
  } catch (error) {
    console.error("Error fetching livraison facts by Code_tiers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};