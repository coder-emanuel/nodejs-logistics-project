import { Router } from 'express'
import { getButAll,getById,InsertNewDataController,UpdateById,deleteById} from '../controllers/driversController.js'


export const driverRouter=Router()

driverRouter.get('/',getButAll)
driverRouter.get('/:id',getById)
driverRouter.post('/',InsertNewDataController)
driverRouter.put('/:id',UpdateById)
driverRouter.delete('/:id',deleteById)