import mongoose from 'mongoose'

const Schema = mongoose.Schema

const filterSchema = new Schema({
  title: String
},{
  timestamps: true,
})

const Filter = mongoose.model('Filter', filterSchema)

export { Filter }