import { Router } from "express";
import passport from "passport";
import userModel from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

const router = Router();

// Login con JWT
router.post("/login", (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).send({
                status: "error",
                message: info?.message || "Unauthorized"
            });
        }

        const token = generateToken(user);
        return res.send({
            status: "success",
            token
        });
    })(req, res, next);
});

// Current: valida usuario por JWT
router.get("/current", passport.authenticate("current", { session: false }), async (req, res) => {
    const user = await userModel.findById(req.user._id).lean();
    if (!user) {
        return res.status(404).send({
            status: "error",
            message: "User not found"
        });
    }
    delete user.password;
    return res.send({
        status: "success",
        payload: user
    });
});

export default router;
