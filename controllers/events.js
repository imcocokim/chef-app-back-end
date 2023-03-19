import { Event } from '../models/event.js'


const create = async (req, res) => {
  try {
    const event = await Event.create(req.body)
    res.status(201).json(event)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  create,
}
