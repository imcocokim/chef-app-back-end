import { Dish } from '../models/dish.js'

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const dish = await Dish.create(req.body)
    res.status(201).json(dish)
  } catch (err) {
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const dish = await Dish.find({})
    .populate('filter')
    res.status(201).json(dish)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteOne = async (req, res) => {
  try {
    Dish.findByIdAndDelete(req.params.id)
    .then (deletedDish => {
      res.json(deletedDish)
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    Dish.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate('filter')
    .then (updatedDish => {
      res.json(updatedDish)
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateFilter = async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { filter: req.body.filter } },
      { new: true }
    )
    .populate('filter')
    res.json(updatedDish)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  deleteOne as delete,
  update, 
  updateFilter
}


// $addToSet opterator adds a value to an array unless the value is already present, in which case $addToSet does nothing to the array. Link to doc:
// https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/