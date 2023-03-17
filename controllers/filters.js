import { Filter } from '../models/filter.js'

const create = async (req, res) => {
  try {
    const filter = await Filter.create(req.body)
    res.status(201).json(filter)
  } catch (err) {
    res.status(500).json(err)
  }
}
const index = async (req, res) => {
  try {
    const filter = await Filter.find({})
    res.status(201).json(filter)
  } catch (err) {
    res.status(500).json(err)
  }
}

function deleteOne(req, res){
  Filter.findByIdAndDelete(req.params.id)
  .then(deletedFilter => {
    res.json(deletedFilter)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}




export {
  create,
  index,
  deleteOne as delete,
}
