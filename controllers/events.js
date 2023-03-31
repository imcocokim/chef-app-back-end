import { Event } from '../models/event.js'
import { Dish } from '../models/dish.js'
import { Filter } from '../models/filter.js'


const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const event = await Event.create(req.body)

    const filter = await Filter.findById(req.body.filters)

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
    .populate('filters')
    .populate('dishes')
    
    res.status(200).json(event)
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
    .populate('filters')
    .populate('dishes')

    res.status(200).json(updatedEvent)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateFilter = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id,
      { $addToSet: { filters: req.body.filters } },
      { new: true }
    )
    .populate('filters')

    const filter = await Filter.findById(req.body.filters)

    if (!filter.events.includes(updatedEvent._id)) {
      filter.events.push(updatedEvent._id)
      await filter.save()
    }

    res.status(200).json(updatedEvent)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  deleteOne as delete,
  index,
  update,
  updateFilter
}
