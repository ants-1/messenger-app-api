import mongoose, { Schema } from "mongoose";

const MessageSchema = Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    chatRoom: {
        type: Schema.Types.ObjectId,
        ref: 'ChatRoom',
        required: true,
    }
}, {
    Timestamp: true
});

export default mongoose.model('Message', MessageSchema);