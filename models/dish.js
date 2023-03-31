import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dishSchema = new Schema({
  isFavorite: {type: Boolean, default: false},
  photo: String,
  title: {type: String, required: true},
  description: String,
  yield: String,
  prep: String,
  cook: String,
  filters: [{ type: Schema.Types.ObjectId, ref: 'Filter' }],
  ingredients: String,
  directions: String,
  notes: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'Profile' }]
},{
  timestamps: true,
})

const Dish = mongoose.model('Dish', dishSchema)

export { Dish }
