import CartService from "../services/cartService.js";
import PurchaseService from "../services/purchaseService.js";

const cartService = new CartService();
const purchaseService = new PurchaseService();

export const addProductToCart = async (req, res) => {
    try {
        const cart = await cartService.addProductToCart(req.params.cid, req.params.pid);
        return res.send({ status: "success", payload: cart });
    } catch (error) {
        return res.status(400).send({ status: "error", message: error.message });
    }
};

export const purchaseCart = async (req, res) => {
    try {
        const result = await purchaseService.purchaseCart(req.params.cid, req.user.email);
        return res.send({ status: "success", payload: result });
    } catch (error) {
        return res.status(400).send({ status: "error", message: error.message });
    }
};
