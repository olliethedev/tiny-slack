import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.models.Workspace ||
  mongoose.model("Workspace", WorkspaceSchema);
