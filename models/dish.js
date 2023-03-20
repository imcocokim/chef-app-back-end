import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dishSchema = new Schema({
  title: String,
  description: String,
  yield: String,
  prep: String,
  cook: String,
  filter: [{ type: Schema.Types.ObjectId, ref: 'Filter' }],
  ingredients: String,
  directions: String,
  notes: String
},{
  timestamps: true,
})

const Dish = mongoose.model('Dish', dishSchema)

export { Dish }
