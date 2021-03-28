import mongoose from "mongoose";
import { getConnection } from "./../utils/database";
import User from './User';

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

MessageSchema.statics.createWithUserEmail = async function createWithUserEmail(channel, content, email){
  let user = await User.findOne({email});

  return (new this({channel, content, user:user._id})).save();
}

export default conn.model("Message", MessageSchema);
