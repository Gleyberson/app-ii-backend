import passport from "passport";
import { generateToken } from "../utils/jwt.js";
import CurrentUserDTO from "../dto/currentUserDto.js";
import SessionService from "../services/sessionService.js";

const sessionService = new SessionService();

export const login = (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).send({
                status: "error",
                message: info?.message || "Unauthorized"
            });
        }

        const token = generateToken(user);
        return res.send({
            status: "success",
            token
        });
    })(req, res, next);
};

export const getCurrent = async (req, res) => {
    const dto = new CurrentUserDTO(req.user);
    return res.send({
        status: "success",
        payload: dto
    });
};

export const forgotPassword = async (req, res) => {
    try {
        const result = await sessionService.requestPasswordReset(req.body.email);
        return res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: error.message
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const result = await sessionService.resetPassword(req.body);
        return res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: error.message
        });
    }
};
