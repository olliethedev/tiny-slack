import mongoose from "mongoose";
import { getConnection } from "./../utils/database";

const conn = getConnection();
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default conn.model("Message", MessageSchema);
