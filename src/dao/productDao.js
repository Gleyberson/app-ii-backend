import productModel from "../models/productModel.js";

class ProductDao {
    async findAll() {
        return productModel.find().lean();
    }

    async findById(id) {
        return productModel.findById(id).lean();
    }

    async create(data) {
        return productModel.create(data);
    }

    async updateById(id, data) {
        return productModel.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async deleteById(id) {
        return productModel.deleteOne({ _id: id });
    }
}

export default ProductDao;
