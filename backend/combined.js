
// --------- achats_vente.js ---------

      import mongoose from "mongoose";

      const achats_venteSchema = new mongoose.Schema({
  "_id": "object",
  "id_achat1": "number",
  "date_operation": "string",
  "date_meteo": "string",
  "station": "string",
  "Code_tiers": "string",
  "Centre": "string",
  "Code_article": "string",
  "code_operation": "string",
  "id_junk": "number",
  "qte_article": "number",
  "mnt_base": "number",
  "mnt_bonif": "number",
  "mnt_refact": "number",
  "mnt_prime": "number",
  "mnt_taxe": "number",
  "mont_ttc": "number"
});

      export default mongoose.model("achats_vente", achats_venteSchema);
      

// --------- article.js ---------

      import mongoose from "mongoose";

      const articleSchema = new mongoose.Schema({
  "_id": "object",
  "Id_article": "number",
  "Code_article": "string",
  "Lib_article": "string",
  "Cod_fam": "string"
});

      export default mongoose.model("article", articleSchema);
      

// --------- centre.js ---------

      import mongoose from "mongoose";

      const centreSchema = new mongoose.Schema({
  "_id": "object",
  "id_centre": "number",
  "Centre": "string",
  "Nom_Centre": "string",
  "Gouvernorat": "string"
});

      export default mongoose.model("centre", centreSchema);
      

// --------- clients.js ---------

      import mongoose from "mongoose";

      const clientsSchema = new mongoose.Schema({
  "_id": "object",
  "id": "number",
  "code_tiers": "string",
  "nom_afftiers": "string",
  "type_client": "string"
});

      export default mongoose.model("clients", clientsSchema);
      

// --------- dates.js ---------

      import mongoose from "mongoose";

      const datesSchema = new mongoose.Schema({
  "_id": "object",
  "id_date": "number",
  "key_date": "string",
  "date": "object",
  "heur": "string",
  "jour": "string",
  "mois": "string",
  "annee": "string"
});

      export default mongoose.model("dates", datesSchema);
      

// --------- junk_table.js ---------

      import mongoose from "mongoose";

      const junk_tableSchema = new mongoose.Schema({
  "_id": "object",
  "id_junk": "number",
  "code_type_facture": "string",
  "code_type_operation": "string",
  "code_statut": "string"
});

      export default mongoose.model("junk_table", junk_tableSchema);
      

// --------- livraison.js ---------

      import mongoose from "mongoose";

      const livraisonSchema = new mongoose.Schema({
  "_id": "object",
  "id_livr": "number",
  "date_meteo": "string",
  "station": "string",
  "date_livraison": "string",
  "date_facturation": "string",
  "Code_tiers": "string",
  "Centre": "string",
  "ETAT": "string",
  "MNT_TTC": "number",
  "MNT_BRUT": "number",
  "MONT_REG": "number"
});

      export default mongoose.model("livraison", livraisonSchema);
      

// --------- meteo.js ---------

      import mongoose from "mongoose";

      const meteoSchema = new mongoose.Schema({
  "_id": "object",
  "id_meteo": "number",
  "date": "string",
  "tavg": "number",
  "tmin": "number",
  "tmax": "number",
  "prcp": "number",
  "wspd": "number",
  "station": "string"
});

      export default mongoose.model("meteo", meteoSchema);
      

// --------- users.js ---------

      import mongoose from "mongoose";

      const usersSchema = new mongoose.Schema({
  "_id": "object",
  "fullName": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "createdAt": "object",
  "updatedAt": "object",
  "__v": "number"
});

      export default mongoose.model("users", usersSchema);
      
