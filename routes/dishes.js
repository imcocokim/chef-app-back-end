import { Router } from 'express'
import * as dishesCtrl from '../controllers/dishes.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, dishesCtrl.create)
router.get('/', checkAuth, dishesCtrl.index)
router.put('/:id', checkAuth, dishesCtrl.update)
router.put('/:id', checkAuth, dishesCtrl.updateFilter)
router.delete('/:id', checkAuth, dishesCtrl.delete)

export { router }
