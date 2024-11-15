const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
require('dotenv').config();

const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

// Define validation schema for signup
const signupBody = zod.object({
    username: zod.string().min(1, "Username is required"),
    password: zod.string().min(1, "Password is required"),
    firstname: zod.string().min(1, "First name is required"),
    lastname: zod.string().min(1, "Last name is required")
});

// Signup route
router.post("/signup", async (req, res) => {
    const parseResult = signupBody.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid input. Please check your details and try again."
        });
    }

    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already taken or incorrect details"
            });
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        const userId = user._id;

        await Account.create({
            userId,
            balance: (1 * Math.random() * 1000).toFixed(2)
        });

        const token = jwt.sign({ userId },  process.env.JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token,
            userId: userId
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            message: "An error occurred during signup"
        });
    }
});

// Define validation schema for signin
const signinBody = zod.object({
    username: zod.string().min(1, "Username is required"),
    password: zod.string().min(1, "Password is required")
});

// Signin route
router.post("/signin", async (req, res) => {
    const parseResult = signinBody.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid details provided"
        });
    }

    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({ userId: user._id },  process.env.JWT_SECRET);

            return res.json({
                token: token,
                userId: user._id,
                msg: "Successful sign-in"
            });
        }

        return res.status(401).json({
            message: "Invalid username or password"
        });
    } catch (err) {
        console.error("Error during sign-in:", err);
        res.status(500).json({
            message: "An error occurred during sign-in"
        });
    }
});

// Define validation schema for update
const updateSchema = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
});

// Update route
router.put("/", authMiddleware, async (req, res) => {
    const parseResult = updateSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid input. Please check your details and try again."
        });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);
        res.json({ message: "Updated successfully" });
    } catch (error) {
        console.error("Error during update:", error);
        res.status(500).json({ message: "An error occurred during update" });
    }
});

// Bulk user retrieval route
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [
                { firstname: { "$regex": filter, "$options": "i" } },
                { lastname: { "$regex": filter, "$options": "i" } }
            ]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: "An error occurred while retrieving users"
        });
    }
});

module.exports = router;
