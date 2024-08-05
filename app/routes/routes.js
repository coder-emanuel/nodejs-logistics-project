import express from 'express';
import { warehouseRouter } from '../views/warehouses.js';
import { driverRouter } from '../views/drivers.js';
import { shipmentRouter } from '../views/shipments.js';
import { vehicleRouter } from '../views/vehicles.js';

export const routes = express();

routes.use('/warehouses', warehouseRouter);
routes.use('/drivers', driverRouter);
routes.use('/shipments', shipmentRouter);
routes.use('/vehicles', vehicleRouter);
