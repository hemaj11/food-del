import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://hemaj:hema1621@cluster0.bt0y21f.mongodb.net/food-delivery')
        .then(() => {
            console.log("MongoDB connected successfully");
        });
}