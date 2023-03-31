import { Router } from 'express'
import * as eventsCtrl from '../controllers/events.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, eventsCtrl.create)
router.get('/', checkAuth, eventsCtrl.index)
router.put('/:id', checkAuth, eventsCtrl.update)
router.put('/:id/filter', checkAuth, eventsCtrl.updateFilter)
router.put('/:id/dish', checkAuth, eventsCtrl.updateDish)
router.delete('/:eventId/filter/:filterId', checkAuth, eventsCtrl.deleteFilter)
router.delete('/:id', checkAuth, eventsCtrl.delete)

export { router }
