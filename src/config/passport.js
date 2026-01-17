import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../models/userModel.js";
import { isValidPassword } from "../utils/password.js";
import { getJwtSecret } from "../utils/jwt.js";

const initializePassport = () => {
    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user) return done(null, false, { message: "User not found" });
                if (!isValidPassword(user, password)) return done(null, false, { message: "Invalid credentials" });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.use(
        "current",
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: getJwtSecret()
            },
            async (jwtPayload, done) => {
                try {
                    const user = await userModel.findById(jwtPayload.id).lean();
                    if (!user) return done(null, false, { message: "User not found" });
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

export default initializePassport;
