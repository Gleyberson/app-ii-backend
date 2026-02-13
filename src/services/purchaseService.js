import crypto from "crypto";
import CartRepository from "../repositories/cartRepository.js";
import ProductRepository from "../repositories/productRepository.js";
import TicketRepository from "../repositories/ticketRepository.js";

class PurchaseService {
    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
        this.ticketRepository = new TicketRepository();
    }

    async purchaseCart(cartId, purchaserEmail) {
        const cart = await this.cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const productsInCart = Array.isArray(cart.products) ? cart.products : [];

        let totalAmount = 0;
        const notProcessed = [];

        for (const item of productsInCart) {
            const productId = item.product;
            const quantity = item.quantity || 0;

            const product = await this.productRepository.getProductById(productId);
            if (!product || product.stock < quantity) {
                notProcessed.push(item);
                continue;
            }

            totalAmount += product.price * quantity;
            await this.productRepository.updateProduct(productId, {
                stock: product.stock - quantity
            });
        }

        await this.cartRepository.updateCart(cartId, { products: notProcessed });

        if (totalAmount === 0) {
            return {
                ticket: null,
                notProcessed,
                message: "No items were purchased due to insufficient stock"
            };
        }

        const ticket = await this.ticketRepository.createTicket({
            code: crypto.randomUUID(),
            amount: totalAmount,
            purchaser: purchaserEmail
        });

        return {
            ticket,
            notProcessed,
            message: notProcessed.length ? "Partial purchase completed" : "Purchase completed"
        };
    }
}

export default PurchaseService;
