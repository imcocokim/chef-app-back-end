import mongoose from 'mongoose'

const Schema = mongoose.Schema

const filterSchema = new Schema({
  title: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'Profile' }]
},{
  timestamps: true,
})

const Filter = mongoose.model('Filter', filterSchema)

export { Filter }
