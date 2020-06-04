import express from 'express'

// CONTROLLERS
import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router()
const pointsController = new PointsController()
const itemsController = new ItemsController()

// ROUTES
routes.get('/items', itemsController.index)

routes.post('/points', pointsController.create)

export default routes