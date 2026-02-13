import cartModel from "../models/cartModel.js";

class CartDao {
    async create(data = {}) {
        return cartModel.create(data);
    }

    async findById(id) {
        return cartModel.findById(id).lean();
    }

    async updateById(id, data) {
        return cartModel.findByIdAndUpdate(id, data, { new: true }).lean();
    }
}

export default CartDao;
