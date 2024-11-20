import mongoose, { Schema } from "mongoose";

const ChatRoomSchema = Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 100,
      unique: true,
    },
    description: {
      type: String,
      maxLength: 300,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    Timestamp: true,
  }
);

export default mongoose.model("ChatRoom", ChatRoomSchema);
