import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
  date: String,
  client: String,
  time: String,
  location: String,
  details: String,
  courses: Number,
  dessert: Boolean,
  drink: Boolean,
  restrictions: [{ type: Schema.Types.ObjectId, ref: 'Filter' }],
  notes: String,
  menu: [{ type: Schema.Types.ObjectId, ref: 'Dish' }]

},{
  timestamps: true,
})

const Event = mongoose.model('Event', eventSchema)

export { Event }
