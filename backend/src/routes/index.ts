import { Router } from 'express'
import sensorRoutes from './sensorRoutes'

const router = Router();

router.use('/sensor', sensorRoutes)

export default router;