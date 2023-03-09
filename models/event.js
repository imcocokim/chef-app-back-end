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
  restrictions: String,

},{
  timestamps: true,
})

const Event = mongoose.model('Event', profileSchema)

export { Event }
