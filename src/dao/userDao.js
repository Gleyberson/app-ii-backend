import userModel from "../models/userModel.js";

class UserDao {
    async findAll() {
        return userModel.find().lean();
    }

    async findById(id) {
        return userModel.findById(id).lean();
    }

    async findByIdDoc(id) {
        return userModel.findById(id);
    }

    async findByEmail(email) {
        return userModel.findOne({ email }).lean();
    }

    async findByEmailDoc(email) {
        return userModel.findOne({ email });
    }

    async create(data) {
        return userModel.create(data);
    }

    async updateById(id, data) {
        return userModel.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async deleteById(id) {
        return userModel.deleteOne({ _id: id });
    }
}

export default UserDao;
