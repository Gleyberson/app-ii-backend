import CartRepository from "../repositories/cartRepository.js";
import ProductRepository from "../repositories/productRepository.js";

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        const items = Array.isArray(cart.products) ? [...cart.products] : [];
        const existingIndex = items.findIndex((item) => String(item.product) === String(productId));

        if (existingIndex >= 0) {
            items[existingIndex].quantity += 1;
        } else {
            items.push({ product: productId, quantity: 1 });
        }

        return this.cartRepository.updateCart(cartId, { products: items });
    }
}

export default CartService;
