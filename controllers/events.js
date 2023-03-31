import { Event } from '../models/event.js'
import { Dish } from '../models/dish.js'
import { Filter } from '../models/filter.js'


const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const event = await Event.create(req.body)

    const filter = await Filter.findById(req.body.restrictions)

    if (!filter.events.includes(event._id)) {
      filter.events.push(event._id)
      await filter.save()
    }

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
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate('restrictions')
    .populate('menu')

    res.status(200).json(updatedEvent)
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
