import UserService from "../services/userService.js";

const userService = new UserService();

export const getUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const result = await userService.createUser(req.body);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const result = await userService.updateUser(req.params.uid, req.body);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.uid);
        res.status(200).send({
            status: "success",
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message
        });
    }
};
