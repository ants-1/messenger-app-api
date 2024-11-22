import express from "express";
import messageController from "../controllers/messageController.js";

const router = express.Router();

router.get("/chatRooms/:chatRoomId/messages", messageController.getAllMessages);

router.get("/chatRooms/:chatRoomId/messages/:messageId", messageController.getMessage);

router.post("/chatRooms/:chatRoomId/messages", messageController.createMessage);

router.put("/chatRooms/:chatRoomId/messages/:messageId", messageController.editMessage);

router.delete("/chatRooms/:chatRoomId/messages/:messageId", messageController.deleteMessage)

export default router;