import { Filter } from '../models/filter.js'

const create = async (req, res) => {
  try {
    const filter = await Filter.create(req.body)
    res.status(201).json(filter)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  create,
}
