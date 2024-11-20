import User from "../models/User.js";
import ChatRoom from "../models/ChatRoom.js";

const getAllChatRooms = async (req, res, next) => {
  try {
    const chatRooms = await ChatRoom.find().exec();

    if (chatRooms.length === 0) {
      return res.status(404).json({ message: "No chat rooms found" });
    }

    return res.status(200).json({ chatRooms });
  } catch (err) {
    return next(err);
  }
};

const getChatRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chatRoom = await ChatRoom.findById(id);

    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    return res.status(200).json({ chatRoom });
  } catch (err) {
    next(err);
  }
};

const createChatRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const newChatRoom = new ChatRoom({
      name: req.body.name,
      description: req.body.description || "",
      host: id,
      users: [id],
    });

    const existingChatRoom = await ChatRoom.findOne({ name: newChatRoom.name });

    if (existingChatRoom) {
      return res
        .status(404)
        .json({ message: `Chat name: ${newChatRoom.name}, already exist` });
    }

    if (!newChatRoom) {
      return res
        .status(404)
        .json({ message: "Error while creating new chat room" });
    }

    await newChatRoom.save();

    return res.status(200).json({ newChatRoom });
  } catch (err) {
    return next(err);
  }
};

const updateChatRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedChatRoom = {
      name: req.body.name,
      description: req.body.description,
    };
    const chatRoom = await ChatRoom.findByIdAndUpdate(id, updatedChatRoom, {
      new: true,
    });

    if (!chatRoom) {
      return res
        .status(404)
        .json({ message: "Error while updating chat room" });
    }

    return res.status(200).json({ updatedChatRoom });
  } catch (err) {
    return next(err);
  }
};

const joinChatRoom = async (req, res, next) => {
  try {
    const { chatRoomId, userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) {
      return res
        .status(404)
        .json({ message: `Chat room not found ${chatRoomId}` });
    }

    const userExists = chatRoom.users.some((id) => id.equals(userId));

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User is already in the chat room" });
    }

    chatRoom.users.push(userId);
    await chatRoom.save();

    return res
      .status(200)
      .json({ message: `Joined chat room: ${chatRoom.name}` });
  } catch (err) {
    return next(err);
  }
};

const leaveChatRoom = async (req, res, next) => {
  try {
    const { userId, chatRoomId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) {
      return res
        .status(404)
        .json({ message: `Chat room not found: ${chatRoomId}` });
    }

    const userExists = chatRoom.users.some((id) => id.equals(userId));

    if (!userExists) {
      return res.status(400).json({ message: "User is not in the chat room" });
    }

    chatRoom.users = chatRoom.users.filter((id) => !id.equals(userId));
    await chatRoom.save();

    return res
      .status(200)
      .json({ message: `Left chat room: ${chatRoom.name}` });
  } catch (err) {
    return next(err);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const { chatRoomId, hostId, userId } = req.params;

    const host = await User.findById(hostId);
    const user = await User.findById(userId);

    if (!user || !host) {
      return res.status(404).json({ message: "User or host not found" });
    }

    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    if (!chatRoom.host.equals(hostId)) {
      return res
        .status(403)
        .json({ message: "User is not the host of the chat room" });
    }

    if (hostId === userId) {
      return res.status(400).json({ message: "Host cannot remove themselves" });
    }

    const userExists = chatRoom.users.some((id) => id.equals(userId));

    if (!userExists) {
      return res.status(400).json({ message: "User is not in the chat room" });
    }

    chatRoom.users = chatRoom.users.filter((id) => !id.equals(userId));
    await chatRoom.save();

    return res.status(200).json({
      message: `User: ${user.name} has been removed from the chat room: ${chatRoom.name}`,
    });
  } catch (err) {
    return next(err);
  }
};

const deleteChatRoom = async (req, res, next) => {
  try {
    const { userId, chatRoomId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (chatRoom.host != userId) {
      return res.status(404).json({ message: "User is not host of chat room" });
    }

    const deletedChatRoom = await ChatRoom.findByIdAndDelete(chatRoomId);

    if (!deletedChatRoom) {
      return res
        .status(404)
        .json({ message: "Error while deleting char room" });
    }

    return res.status(200).json({ message: "Chat room successfully deleted" });
  } catch (err) {
    return next(err);
  }
};

export default {
  getAllChatRooms,
  getChatRoom,
  createChatRoom,
  updateChatRoom,
  deleteChatRoom,
  joinChatRoom,
  leaveChatRoom,
  removeUser,
};
