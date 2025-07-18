import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // check if the user exists
        const user = await userModel.findOne({ email });
        

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
        
        
    }
    catch (error) {
        console.error("Error in loginUser:", error);
        res.json({ success: false, message: "Internal server error" });
    }
}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}


// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        // password validation
        if (password.length<8) {
            return res.json({ success: false, message: "Weak password. It should be at least 8 characters long, contain uppercase and lowercase letters, numbers, and symbols." });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user
        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        });

        // save the user
        const user = await newUser.save();
        const token = createToken(user._id);

        // send response
        res.json({ success: true, token });
    }
    catch (error) {
        console.error("Error in registerUser:", error);
        res.json({ success: false, message: "Internal server error" });
    }
}

export { loginUser, registerUser };