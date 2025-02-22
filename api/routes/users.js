import express from "express";
import { deleteUser, updatedUser, getUser, getAllUser } from "../controllers/user.js";
import { verifyUser } from "../utils/verifyUser.js";
import upload from "../controllers/upload.js"; // Ensure this is correctly imported

const router = express.Router();

router.get("/checkauthentication", verifyUser, (req, res, next) => {
    res.send("Hello user, you are logged in!");
});

// UPDATE
router.put("/:id", verifyUser, upload.single('image'), updatedUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

export default router;