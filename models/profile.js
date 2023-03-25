import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  filters: [{ type: Schema.Types.ObjectId, ref: 'Filter' }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
