import ChatRoom from "../models/ChatRoom.js";
import Message from "../models/Message.js";

const getAllMessages = async (req, res, next) => {
  try {
    const { chatRoomId } = req.params;
    const chatRoom = await ChatRoom.findById(chatRoomId).exec();

    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    const messages = await Message.find().exec();

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    return res.status(200).json({ messages });
  } catch (err) {
    return next(err);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { chatRoomId, messageId } = req.params;
    console.log(messageId);

    const message = await Message.findById(messageId).exec();

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.chatRoom.toString() !== chatRoomId) {
      return res
        .status(404)
        .json({ message: "Message does not belong to this chat room" });
    }

    return res.status(200).json({ message });
  } catch (err) {
    return next(err);
  }
};


const createMessage = async (req, res, next) => {
  try {
    const { chatRoomId } = req.params;
    const chatRoom = await ChatRoom.findById(chatRoomId).exec();

    if (!chatRoom) {
      return res.status(404).json({ message: "Chat Room not found" });
    }

    const newMessage = new Message({
      content: req.body.content,
      sender: req.body.sender,
      chatRoom: chatRoomId,
    });

    await newMessage.save();

    return res.status(200).json({ newMessage });
  } catch (err) {
    return next(err);
  }
};


const editMessage = async (req, res, next) => {
  try {
    const { chatRoomId, messageId } = req.params;
    const chatRoom = await ChatRoom.findById(chatRoomId).exec();

    if (!chatRoom) {
      return res.status(404).json({ message: "Chat Room not found" });
    }

    const updatedMessage = {
      content: req.body.content,
      chatRoom: chatRoomId
    };

    const message = await Message.findByIdAndUpdate(messageId, updatedMessage);

    if (!message) {
      return res.status(404).json({ message: "Error while updating message"});
    }

    return res.status(200).json({ updatedMessage });
  } catch (err) {
    return next(err);
  }
};

const deleteMessage = async (req, res, next) => {
    try {
        const { chatRoomId, messageId } = req.params;
        const chatRoom = await ChatRoom.findById(chatRoomId).exec();
    
        if (!chatRoom) {
          return res.status(404).json({ message: "Chat room not found" });
        }
    
        const message = await Message.findById(messageId).exec();
    
        if (!message) {
          return res.status(404).json({ message: "Message not found" });
        }

        const deleteMessage = await Message.findByIdAndDelete(messageId);

        if (!deleteMessage) {
            return res
              .status(404)
              .json({ message: "Error while deleting message" });
          }
      
          return res.status(200).json({ message: "message successfully deleted" });
    } catch (err) {
        return next(err);
    }
};

export default {
  getAllMessages,
  getMessage,
  createMessage,
  editMessage,
  deleteMessage
};
