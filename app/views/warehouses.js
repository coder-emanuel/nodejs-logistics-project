import { Router } from "express";
import {  getButAll,InsertNewDataController,UpdateById,deleteById,getById } from "../controllers/warehouseController.js";

export const warehouseRouter = Router();

warehouseRouter.get('/', getButAll);
warehouseRouter.get('/:id', getById);
warehouseRouter.post(`/`, InsertNewDataController);
warehouseRouter.put('/:id', UpdateById);
warehouseRouter.delete('/:id', deleteById);

