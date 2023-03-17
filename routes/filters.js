import { Router } from 'express'
import * as filtersCtrl from '../controllers/filters.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, filtersCtrl.create)
router.get('/', checkAuth, filtersCtrl.index)
router.delete('/:id', checkAuth, filtersCtrl.delete)

export { router }
