import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body;

        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ message: "Please send All details" })
        }

        const exitUser = await User.findOne({ email });
        if (exitUser) {
            return res.status(400).json({ message: "User Already exits" })
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword
        })

        let token;
        try {
            token = await generateToken(user._id);
        } catch (err) {
            console.log(err);
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,          // for local dev
            sameSite: "lax",        // cross-port allowed
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            user: {
                firstName,
                lastName,
                userName,
                email
            }
        })

    } catch (err) {
        return res.status(500).json({ message: "internal Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let exitUser = await User.findOne({ email });
        if (!exitUser) {
            return res.status(400).json({ message: "User not Found" })
        }
        let match = await bcrypt.compare(password, exitUser.password);
        if (!match) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        let token;
        try {
            token = await generateToken(exitUser._id);
        } catch (err) {
            console.log(err);
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            user: {
                firstName: exitUser.firstName,
                lastName: exitUser.lastName,
                userName: exitUser.userName,
                email: exitUser.email
            }
        })

    } catch (err) {
        console.log("login : ", err)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "logout sucessfully" })
    } catch (err) {
        console.log("logout :", err)
    }
}


