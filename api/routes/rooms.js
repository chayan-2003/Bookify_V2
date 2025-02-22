import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updatedRoom, updateRoomAvailability } from "../controllers/room.js";
// import { verifyAdmin } from "../utils/verifyToken.js";

const router= express.Router();

// //CREATE
// router.post("/:hotelid",verifyAdmin, createRoom);
// //UPDATE
router.put("/:id", updatedRoom);
router.put("/availability/:id", updateRoomAvailability);
// //DELETE
// router.delete("/:id/:hotelid",verifyAdmin, deleteRoom);
//GET
router.get("/:id",getRoom);
//GETALL
router.get("/", getAllRoom);

export default router;