import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import e from "express";


// User registration
async function signUpUser(req, res) {}

// User login
async function loginUser(req, res) {}

export { signUpUser, loginUser };