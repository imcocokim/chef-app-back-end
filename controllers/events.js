import { Event } from '../models/event.js'


const create = async (req, res) => {
  try {
    const event = await Event.create(req.body)
    res.status(201).json(event)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteOne= async (req, res) => {
  try {
    Event.findByIdAndDelete(req.params.id)
    .then(deletedEvent => {
      res.json(deletedEvent)
    })
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  create,
  deleteOne as delete,
}
