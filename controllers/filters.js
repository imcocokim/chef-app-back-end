import { Filter } from '../models/filter.js'
import { Profile } from '../models/profile.js'


const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const filter = await Filter.create(req.body)
    await Profile.updateOne(
      {_id: req.user.profile},
      {$push: {filters: filter}}
    )

    res.status(201).json(filter)
  } catch (err) {
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const filter = await Filter.find({})
    .populate(['events', 'author', 'dishes'])

    res.status(200).json(filter)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteOne = async (req, res) => {
  try {
    const filter = await Filter.findById(req.params.id)
    .populate(['events', 'author', 'dishes'])
    await filter.remove()
    
    res.status(200).json({ message: 'Filter and related documents deleted' })
  } catch (err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedFilter = await Filter.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.status(200).json(updatedFilter)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  deleteOne as delete,
  update
}


// function deleteOne(req, res){
//   Filter.findByIdAndDelete(req.params.id)
//   .then(deletedFilter => {
//     res.json(deletedFilter)
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json(err)
//   })
// }