import crypto from "crypto";
import UserRepository from "../repositories/userRepository.js";
import { env } from "../config/env.js";
import { sendPasswordResetMail } from "../config/mailer.js";
import { createHash, isValidPassword } from "../utils/password.js";

class SessionService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async requestPasswordReset(email) {
        const userDoc = await this.userRepository.getUserByEmailDoc(email);
        if (!userDoc) {
            return { message: "If the email exists, a reset link has been sent" };
        }

        const rawToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        userDoc.resetPasswordToken = tokenHash;
        userDoc.resetPasswordExpires = expiresAt;
        await userDoc.save();

        const resetLink = `${env.FRONTEND_URL}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;
        await sendPasswordResetMail({ to: email, resetLink });

        return { message: "If the email exists, a reset link has been sent" };
    }

    async resetPassword({ email, token, newPassword }) {
        const userDoc = await this.userRepository.getUserByEmailDoc(email);
        if (!userDoc || !userDoc.resetPasswordToken || !userDoc.resetPasswordExpires) {
            throw new Error("Invalid or expired token");
        }

        if (userDoc.resetPasswordExpires.getTime() < Date.now()) {
            throw new Error("Token expired");
        }

        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        if (tokenHash !== userDoc.resetPasswordToken) {
            throw new Error("Invalid or expired token");
        }

        if (isValidPassword(userDoc, newPassword)) {
            throw new Error("New password must be different from the current one");
        }

        userDoc.password = createHash(newPassword);
        userDoc.resetPasswordToken = undefined;
        userDoc.resetPasswordExpires = undefined;
        await userDoc.save();

        return { message: "Password updated successfully" };
    }
}

export default SessionService;
