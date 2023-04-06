import { Event } from '../models/event.js'
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
    const event = await Event.find({author:req.user.id})
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

const deleteFilter = async (req, res) => {
  try {
    const {eventId, filterId} = req.params

    const updatedEvent = await Event.findOneAndUpdate(
      {_id: eventId},
      { $pull: {filters: filterId }},
      { new: true }
    )
    .populate('filters')

    const updatedFilter = await Filter.findOneAndUpdate(
      { _id: filterId },
      { $pull: { events: eventId }},
      { new: true }
    )
    .populate('events')

    res.status(200).json({ message: 'Filter deleted from event and event deleted from filter', updatedEvent, updatedFilter})
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateDish = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id,
      { $addToSet: { dishes: req.body.dishes }},
      { new: true }
    )
    .populate('dishes')

    res.status(200).json({ message: 'Dish added to event', updatedEvent})
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteDish = async (req, res) => {
  try {
    const { eventId, dishId } = req.params

    const updatedEvent = await Event.findByIdAndUpdate(
      { _id: eventId},
      { $pull: { dishes: dishId }},
      { new: true }
    )
    .populate('dishes')

    res.status(200).json({ message: 'Dish removed from event', updatedEvent})
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}




export {
  create,
  deleteOne as delete,
  index,
  update,
  updateFilter,
  deleteFilter,
  updateDish,
  deleteDish
}
