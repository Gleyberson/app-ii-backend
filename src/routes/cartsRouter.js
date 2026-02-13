import { Router } from "express";
import passport from "passport";
import { authorizeRoles } from "../middlewares/authorization.js";
import { addProductToCart, purchaseCart } from "../controllers/cartsController.js";

const router = Router();

router.post(
    "/:cid/products/:pid",
    passport.authenticate("current", { session: false }),
    authorizeRoles("user"),
    addProductToCart
);

router.post(
    "/:cid/purchase",
    passport.authenticate("current", { session: false }),
    authorizeRoles("user"),
    purchaseCart
);

export default router;
