import Clients from "../models/clients.js";
import AchatsVenteFact from "../models/achats_vente_fact.js";
import Centre from "../models/centre.js";
import LivraisonFact from "../models/livraison_fact.js";

export const getClientsByGovernorate = async (req, res) => {
  try {
    // Step 1: Fetch all AchatsVenteFact records
    const achatsVenteFacts = await AchatsVenteFact.find();

    // Step 2: Fetch all Clients and map them by code_tiers for quick lookup
    const clients = await Clients.find();
    const clientsMap = new Map(clients.map(client => [client.code_tiers, client]));

    // Step 3: Fetch all Centres and group them by Gouvernorat
    const centres = await Centre.find();
    const governorateMap = new Map();
    centres.forEach(centre => {
      if (!governorateMap.has(centre.Gouvernorat)) {
        governorateMap.set(centre.Gouvernorat, []);
      }
      governorateMap.get(centre.Gouvernorat).push(centre.Centre);
    });

    // Step 4: Process the data to calculate unique clients per governorate
    const governorateClients = {};
    achatsVenteFacts.forEach(record => {
      const client = clientsMap.get(record.Code_tiers);
      if (client) {
        for (const [governorate, centres] of governorateMap.entries()) {
          if (centres.includes(record.Centre)) {
            if (!governorateClients[governorate]) {
              governorateClients[governorate] = new Set();
            }
            governorateClients[governorate].add(client.code_tiers);
          }
        }
      }
    });

    // Step 5: Format the result
    const result = Object.entries(governorateClients).map(([governorate, clients]) => ({
      governorate,
      clients: clients.size,
    }));

    // Step 6: Send the formatted result as a response
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching total clients by governorate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getClientsWithLivraisonFacts = async (req, res) => {
  try {
    const clients = await Clients.find();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
