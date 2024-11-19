import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import User from "../../models/User";

export const initializeSignUp = () => {
    passport.use(
        "signup",
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, username, password, done) => {
                try {
                    const { email, name, username } = req.body;

                    const hashedPassword = await bcrypt.hash(password, 10);

                    const newUser = await User.create({
                        username,
                        name,
                        email,
                        password: hashedPassword
                    });

                    return done(null, newUser);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );
};