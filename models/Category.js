const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types


const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a category name"],
        lowercase: ture,
        unique: true
    },
    description: String,
}, {
    timestamps: true
})

const Category = mongoose.model("Category", CategorySchema);
exports = Category;
