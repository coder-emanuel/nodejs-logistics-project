import { Router } from "express";
import { getButAll,InsertNewDataController,UpdateById,deleteById,getById} from "../controllers/vehiclesController.js";


export const vehicleRouter=Router();

vehicleRouter.get('/',getButAll);
vehicleRouter.get('/:id',getById);
vehicleRouter.post(`/`,InsertNewDataController);
vehicleRouter.put('/:id',UpdateById);
vehicleRouter.delete('/:id',deleteById);