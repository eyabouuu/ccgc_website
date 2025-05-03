
      import mongoose from "mongoose";

      const junkSchema = new mongoose.Schema({
  "_id": "object",
  "id_junk": "number",
  "code_type_facture": "string",
  "code_type_operation": "string",
  "code_statut": "string"
});

      export default mongoose.model("junk", junkSchema);
      