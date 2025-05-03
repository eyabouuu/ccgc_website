
      import mongoose from "mongoose";

      const testSchema = new mongoose.Schema({
  "_id": "object",
  "message": "string"
});

      export default mongoose.model("test", testSchema);
      