import mongoose from "mongoose";
import Workspace from "./Workspace";

const UserSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: true,
  },
  email:  {
    type: String,
    required: true,
  },
  avatarUrl:{
    type: String,
  },
  joined: {
    type: Date, default: Date.now,
  },
});

UserSchema.statics.createIfNeededAndAddToWorkspace = async function createIfNeededAndAddToWorkspace(name, email, avatarUrl, workspaceId){
  let existingUser = await this.findOne({email});

  if(!existingUser) {
    existingUser = new User({name, email, avatarUrl});
    await existingUser.save();
  }
  return await Workspace.findOneAndUpdate({_id:workspaceId},{ $addToSet: { users: existingUser._id } });
}
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;