import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dishSchema = new Schema({
  isFavorite: {type: Boolean, required: true},
  photo: String,
  title: {type: String, required: true},
  cost: String,
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
