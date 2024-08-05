import { Router } from "express";
import { getButAll,InsertNewDataController,UpdateById,deleteById,getById} from "../controllers/shipmentsController.js";

export const shipmentRouter = Router();

shipmentRouter.get('/', getButAll);
shipmentRouter.get('/', getById);
shipmentRouter.post(`/`, InsertNewDataController);
shipmentRouter.put('/:id', UpdateById);
shipmentRouter.delete('/:id', deleteById);