import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req,res) => {
       
    let image_filename = `${req.file.filename}`;
  
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({
            success: true,
            message: "Food item added successfully"
            
        })
    } catch (error) {
        console.error("Error adding food item:", error);
        res.json({success: false, message: "Failed to add food item"});
     }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        });
    }
    catch (error) {
        console.error("Error fetching food items:", error);
        res.json({success: false, message: "Failed to fetch food items"});
    }
}

// remove food item

const removeFood = async (req, res) => {

    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Food item removed successfully"
        });
        
    } catch (error) {
        console.error("Error removing food item:", error);
        res.json({ success: false, message: "Failed to remove food item" });
    }
}

export { addFood,listFood,removeFood };
