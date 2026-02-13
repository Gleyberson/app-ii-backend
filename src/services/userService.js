import UserRepository from "../repositories/userRepository.js";
import CartRepository from "../repositories/cartRepository.js";
import { createHash } from "../utils/password.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.cartRepository = new CartRepository();
    }

    async getAllUsers() {
        const users = await this.userRepository.getAllUsers();
        return users.map(({ password, resetPasswordToken, resetPasswordExpires, ...safeUser }) => safeUser);
    }

    async createUser(data) {
        const { first_name, last_name, age, email, password, cart, role } = data;

        const existingUser = await this.userRepository.getUserByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const cartToUse = cart ?? (await this.cartRepository.createCart({}))._id;

        const createdUser = await this.userRepository.createUser({
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cart: cartToUse,
            role
        });

        const safeUser = createdUser.toObject();
        delete safeUser.password;
        delete safeUser.resetPasswordToken;
        delete safeUser.resetPasswordExpires;

        return safeUser;
    }

    async updateUser(uid, data) {
        const user = await this.userRepository.getUserById(uid);
        if (!user) {
            throw new Error("User not found");
        }

        const newUser = {
            first_name: data.first_name ?? user.first_name,
            last_name: data.last_name ?? user.last_name,
            age: data.age ?? user.age,
            email: data.email ?? user.email,
            password: data.password ? createHash(data.password) : user.password,
            cart: data.cart ?? user.cart,
            role: data.role ?? user.role
        };

        const updatedUser = await this.userRepository.updateUser(uid, newUser);
        const { password, resetPasswordToken, resetPasswordExpires, ...safeUser } = updatedUser;
        return safeUser;
    }

    async deleteUser(uid) {
        return this.userRepository.deleteUser(uid);
    }
}

export default UserService;
