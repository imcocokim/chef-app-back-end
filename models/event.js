import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
  date: {type: String, required: true},
  client: {type: String, required: true},
  time: {type: String, required: true},
  location: String,
  details: String,
  courses: {type: Number, required: true},
  dessert: {type: Boolean, default: false},
  drink: {type: Boolean, default: false},
  restrictions: [{ type: Schema.Types.ObjectId, ref: 'Filter' }],
  notes: String,
  menu: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
  isArchived: {type: Boolean, default: false}

},{
  timestamps: true,
})

const Event = mongoose.model('Event', eventSchema)

export { Event }
