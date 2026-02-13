import { Router } from "express";
import passport from "passport";
import { login, getCurrent, forgotPassword, resetPassword } from "../controllers/sessionsController.js";

const router = Router();

// Login con JWT
router.post("/login", login);

// Current: valida usuario por JWT
router.get("/current", passport.authenticate("current", { session: false }), getCurrent);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
