import { Schema, model, models } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    name: string;
}

const CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;