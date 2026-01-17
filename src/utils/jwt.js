import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const JWT_EXPIRES_IN = "1h";

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const getJwtSecret = () => JWT_SECRET;
