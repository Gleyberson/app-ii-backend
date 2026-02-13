import ProductDao from "../dao/productDao.js";

class ProductRepository {
    constructor() {
        this.productDao = new ProductDao();
    }

    getAllProducts() {
        return this.productDao.findAll();
    }

    getProductById(id) {
        return this.productDao.findById(id);
    }

    createProduct(data) {
        return this.productDao.create(data);
    }

    updateProduct(id, data) {
        return this.productDao.updateById(id, data);
    }

    deleteProduct(id) {
        return this.productDao.deleteById(id);
    }
}

export default ProductRepository;
