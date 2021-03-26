import mongoose from "mongoose";
import { getConnection } from "./../utils/database";

const conn = getConnection();
const Schema = mongoose.Schema;

const WorkspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});
const model = conn.model("Workspace", WorkspaceSchema)
export default model;
