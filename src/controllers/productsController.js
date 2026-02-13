import ProductService from "../services/productService.js";

const productService = new ProductService();

export const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        return res.send({ status: "success", payload: products });
    } catch (error) {
        return res.status(500).send({ status: "error", message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.send({ status: "success", payload: product });
    } catch (error) {
        return res.status(400).send({ status: "error", message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.pid, req.body);
        return res.send({ status: "success", payload: product });
    } catch (error) {
        return res.status(400).send({ status: "error", message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.pid);
        return res.send({ status: "success", payload: result });
    } catch (error) {
        return res.status(400).send({ status: "error", message: error.message });
    }
};
