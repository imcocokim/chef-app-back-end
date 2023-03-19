import { Router } from 'express'
import * as dishesCtrl from '../controllers/dishes.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, dishesCtrl.create)
// router.get('/', checkAuth, filtersCtrl.index)
// router.put('/:id', checkAuth, filtersCtrl.update)
// router.delete('/:id', checkAuth, filtersCtrl.delete)

export { router }
