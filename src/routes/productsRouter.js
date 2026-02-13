import { Router } from "express";
import passport from "passport";
import { authorizeRoles } from "../middlewares/authorization.js";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productsController.js";

const router = Router();

router.get("/", getProducts);

router.post("/", passport.authenticate("current", { session: false }), authorizeRoles("admin"), createProduct);
router.put("/:pid", passport.authenticate("current", { session: false }), authorizeRoles("admin"), updateProduct);
router.delete("/:pid", passport.authenticate("current", { session: false }), authorizeRoles("admin"), deleteProduct);

export default router;
