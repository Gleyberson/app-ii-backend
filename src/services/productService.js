import ProductRepository from "../repositories/productRepository.js";

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    getAllProducts() {
        return this.productRepository.getAllProducts();
    }

    createProduct(data) {
        return this.productRepository.createProduct(data);
    }

    async updateProduct(id, data) {
        const updated = await this.productRepository.updateProduct(id, data);
        if (!updated) {
            throw new Error("Product not found");
        }
        return updated;
    }

    deleteProduct(id) {
        return this.productRepository.deleteProduct(id);
    }
}

export default ProductService;
