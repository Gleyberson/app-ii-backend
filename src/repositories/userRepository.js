import UserDao from "../dao/userDao.js";

class UserRepository {
    constructor() {
        this.userDao = new UserDao();
    }

    getAllUsers() {
        return this.userDao.findAll();
    }

    getUserById(id) {
        return this.userDao.findById(id);
    }

    getUserByEmail(email) {
        return this.userDao.findByEmail(email);
    }

    getUserByEmailDoc(email) {
        return this.userDao.findByEmailDoc(email);
    }

    createUser(data) {
        return this.userDao.create(data);
    }

    updateUser(id, data) {
        return this.userDao.updateById(id, data);
    }

    deleteUser(id) {
        return this.userDao.deleteById(id);
    }
}

export default UserRepository;
