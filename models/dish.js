import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dishSchema = new Schema({
  title: String,
  description: String,
  filter: String,
  ingredients: String,
  recipe: String,
  notes: String
},{
  timestamps: true,
})

const Dish = mongoose.model('Dish', dishSchema)

export { Dish }
