import { Router } from 'express'
import { controllerSensor } from '../controllers/sensorController'

const routes = Router()

routes.get('/', controllerSensor.getValores)
routes.post('/', controllerSensor.save)

export default routes