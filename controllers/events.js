import { Event } from '../models/event.js'


const create = async (req, res) => {
  try {
    const event = await Event.create(req.body)
    res.status(201).json(event)
  } catch (err) {
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const event = await Event.find({})
    .populate('restrictions')
    .populate('menu')
    res.status(201).json(event)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteOne = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const deletedEvent = await Event.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedEvent)
  } catch (err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    Event.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate('restrictions')
    .populate('menu')
    .then (updatedEvent => {
      res.json(updatedEvent)
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  deleteOne as delete,
  index,
  update
}
