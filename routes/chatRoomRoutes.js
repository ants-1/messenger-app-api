import express from "express";
import chatRoomController from "../controllers/chatRoomController.js";

const router = express.Router();

router.get("/chatRooms", chatRoomController.getAllChatRooms);

router.get("/chatRooms/:id", chatRoomController.getChatRoom);

router.post("/chatRooms/:id", chatRoomController.createChatRoom);

router.put("/chatRooms/:id", chatRoomController.updateChatRoom);

router.post("/chatRooms/:chatRoomId/join/:userId", chatRoomController.joinChatRoom);

router.delete("/chatRooms/:chatRoomId/leave/:userId", chatRoomController.leaveChatRoom);

router.delete("/chatRooms/:chatRoomId/user/:userId", chatRoomController.deleteChatRoom);

router.post("/chatRooms/:chatRoomId/host/:hostId/remove/:userId", chatRoomController.removeUser);

export default router;