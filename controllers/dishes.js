import { Dish } from '../models/dish.js'

const create = async (req, res) => {
  try {
    const dish = await Dish.create(req.body)
    res.status(201).json(dish)
  } catch (err) {
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const dish = await Dish.find({})
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
    Dish.findById(req.params.id)
    .then(dish => {
      Dish.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then (updatedDish => {
        res.json(updatedDish)
      })
    })
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
