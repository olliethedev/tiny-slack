import mongoose from "mongoose";
import { getConnection } from "./../utils/database";

const conn = getConnection();
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
})

export default conn.model(
  "Channel",
  ChannelSchema
);
