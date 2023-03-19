import { Router } from 'express'
import * as eventsCtrl from '../controllers/events.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// router.post('/', checkAuth, dishesCtrl.create)
// router.get('/', checkAuth, dishesCtrl.index)
// router.put('/:id', checkAuth, dishesCtrl.update)
// router.delete('/:id', checkAuth, dishesCtrl.delete)

export { router }
