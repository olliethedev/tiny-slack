import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: true,
  }
});

export default mongoose.models.Workspace ||
  mongoose.model("Workspace", WorkspaceSchema);
