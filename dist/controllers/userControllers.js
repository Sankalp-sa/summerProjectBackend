"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.checkAdmin = exports.checkUser = exports.userLogin = exports.userSignUp = exports.getAllUsers = void 0;
const User_js_1 = require("../models/User.js");
const bcrypt_1 = require("bcrypt");
const tokenUtils_js_1 = require("../utils/tokenUtils.js");
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_js_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.getAllUsers = getAllUsers;
const userSignUp = async (req, res, next) => {
    try {
        const { name, email, username, password, gender, dob, phone, Alt_phone, address, role } = req.body;
        // console.log(name, email, password, username)
        // check if user already exists
        const existingUser = await User_js_1.User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = new User_js_1.User({
            name,
            email,
            username,
            password: hashedPassword,
            gender,
            dob,
            phone,
            Alt_phone,
            address,
        });
        await user.save();
        res.clearCookie("auth_token", {
            path: "/",
            signed: true,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: process.env.DOMAIN
        });
        const token = (0, tokenUtils_js_1.createToken)(user._id.toString(), user.email);
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            expires,
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            domain: process.env.DOMAIN
        });
        return res.status(201).json({
            message: "User created successfully",
            id: user._id.toString()
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.userSignUp = userSignUp;
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // check if user exists
        const user = await User_js_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        // check if password is correct
        const isValid = await (0, bcrypt_1.compare)(password, user.password);
        if (!isValid) {
            return res.status(403).json({
                message: "Invalid password"
            });
        }
        // pending_appli_noti(req,res);
        res.clearCookie("auth_token", {
            path: "/",
            signed: true,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: process.env.DOMAIN
        });
        const token = (0, tokenUtils_js_1.createToken)(user._id.toString(), user.email);
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            expires,
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            domain: process.env.DOMAIN
        });
        res.status(200).json({
            ok: true,
            message: "Login successful",
            id: user._id.toString(),
            token: token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.userLogin = userLogin;
// check User 
const checkUser = async (req, res, next) => {
    try {
        console.log(req.body.userId);
        const user = await User_js_1.User.findById(req.body.userId);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        return res.status(200).json({
            ok: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.checkUser = checkUser;
const checkAdmin = async (req, res, next) => {
    try {
        console.log(req.body.userId);
        const user = await User_js_1.User.findById(req.body.userId);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        if (user.role !== "Admin") {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        return res.status(200).json({
            ok: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.checkAdmin = checkAdmin;
const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("auth_token", {
            path: "/",
            signed: true,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: process.env.DOMAIN
        });
        res.status(200).json({
            ok: true,
            message: "Logout successful"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.userLogout = userLogout;
//# sourceMappingURL=userControllers.js.map