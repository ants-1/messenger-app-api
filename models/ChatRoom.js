import mongoose, { Schema } from "mongoose";

const ChatRoomSchema = Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 100,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      maxLength: 300,
    },
    host : {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
