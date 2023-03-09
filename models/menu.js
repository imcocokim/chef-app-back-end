import mongoose from 'mongoose'

const Schema = mongoose.Schema

const menuSchema = new Schema({
  title: String,
  description: String,
  filter: String,
  ingredients: String,
  recipe: String,
  notes: String
},{
  timestamps: true,
})

const Menu = mongoose.model('Menu', profileSchema)

export { Menu }
