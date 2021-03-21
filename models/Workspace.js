import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }]
});

export default mongoose.models.Workspace ||
  mongoose.model("Workspace", WorkspaceSchema);
