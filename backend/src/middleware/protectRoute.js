import { requireAuth } from "@clerk/express";
import User from "../models/User.js";


export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;
            const user = await User.findOne({ clerkId });
            if (!clerkId) {
                return res.status(404).json({ message: "Unauthorized - invalid token" });
            }   
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
]