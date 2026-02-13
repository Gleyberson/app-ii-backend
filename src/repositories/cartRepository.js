import CartDao from "../dao/cartDao.js";

class CartRepository {
    constructor() {
        this.cartDao = new CartDao();
    }

    createCart(data = {}) {
        return this.cartDao.create(data);
    }

    getCartById(id) {
        return this.cartDao.findById(id);
    }

    updateCart(id, data) {
        return this.cartDao.updateById(id, data);
    }
}

export default CartRepository;
