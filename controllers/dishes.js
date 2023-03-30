import { Dish } from '../models/dish.js'
import { Filter } from '../models/filter.js'

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
    const deletedDish = await Dish.findByIdAndDelete(req.params.id)
    res.json(deletedDish)
  } catch (err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate('filter')
    res.json(updatedDish)
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
    
    const filter = await Filter.findById(req.body.filter)

    if (!filter.dishes.includes(updatedDish._id)) {
      filter.dishes.push(updatedDish._id)
      await filter.save()
    }

    res.json(updatedDish)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

const deleteFilter = async (req, res) => {
  try {
    const {dishId, filterId } = req.params

    const updatedDish = await Dish.findOneAndUpdate(
      {_id: dishId},
      { $pull: { filter: filterId }},
      { new:true }
    )
    .populate('filter')

    const updatedFilter = await Filter.findOneAndUpdate(
      { _id: filterId },
      { $pull: { dishes: dishId }},
      { new: true}
    )
    .populate('dishes')

    res.json({ updatedDish, updatedFilter})
  } catch (err) {
    res.status(500).json(err)
  }
}



export {
  create,
  index,
  deleteOne as delete,
  update, 
  updateFilter,
  deleteFilter
}


// $addToSet opterator adds a value to an array unless the value is already present, in which case $addToSet does nothing to the array. Link to doc:
// https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/

// deleteFilter: Needed to find a way that when I delete the filter on the specific dish, the filter will be taken out of the array on the dish model AND the dish will be taken out of the array from the filter model.