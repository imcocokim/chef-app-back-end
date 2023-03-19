import { Dish } from '../models/dish.js'

const create = async (req, res) => {
  try {
    const dish = await Dish.create(req.body)
    res.status(201).json(dish)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  create,
}
