const dateSchema = {
    _id: "string",
    id_date: "number",
    key_date: "string",
    date: {
      $date: "string"
    },
    heur: "string",
    jour: "string",
    mois: "string",
    annee: "string"
  };
  
  module.exports = dateSchema;