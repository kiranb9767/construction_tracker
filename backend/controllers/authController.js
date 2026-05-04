import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";
dotenv.config();

async function signUpUser(req, res) {

    try {

        console.log("Signup request body:", req.body);
        const { name, company, password } = req.body;
        const existingUser = await User.findOne({ name, company });
        console.log("Existing user:", existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }  
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, company, password: hashedPassword });  
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error.message });
    }

}

async function loginUser(req, res) {
    try {
            console.log("Login request body:", req.body);
        const { name, company, password } = req.body;
        const user = await User.findOne({ name, company });
        console.log("User found for login:", user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Generated JWT token:", token);
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { signUpUser, loginUser };