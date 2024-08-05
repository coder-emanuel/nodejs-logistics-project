import { pool } from "../../config/db.js";

// Función para ver toda la información de los envíos
export async function viewAllInformation() {
    try {
        let shipmentsInfo = await pool.query('SELECT * FROM shipments');
        shipmentsInfo = shipmentsInfo[0];
        return shipmentsInfo;
    } catch (err) {
        throw new Error(`Error al obtener toda la información de los envíos: ${err}`);
    }
}

// Función para obtener información de un envío por ID
export async function modelByGetId(id) {
    try {
        const [[data]] = await pool.query('SELECT * FROM shipments WHERE id = ?', [id]);
        return data;
    } catch (error) {
        throw new Error(`Error al obtener el envío por ID: ${error}`);
    }
}

// Función para insertar nuevos datos en la tabla de envíos
export async function InsertNewDataModel(item, quantity, warehouseId, vehicleId, driverId) {
    try {
        const [result] = await pool.query(
            'INSERT INTO shipments(item, quantity, warehouse_id, vehicle_id, driver_id) VALUES(?, ?, ?, ?, ?)',
            [item, quantity, warehouseId, vehicleId, driverId]
        );
        const [[newShipment]] = await pool.query('SELECT * FROM shipments WHERE id = ?', [result.insertId]);
        return newShipment;
    } catch (err) {
        throw new Error(`No fue posible insertar nuevos datos: ${err}`);
    }
}

// Función para actualizar datos en la tabla de envíos
export async function modelsOfUpdate(item, quantity, warehouseId, vehicleId, driverId, id) {
    try {
        // Actualiza los datos del envío
        await pool.query(
            'UPDATE shipments SET item = ?, quantity = ?, warehouse_id = ?, vehicle_id = ?, driver_id = ? WHERE id = ?',
            [item, quantity, warehouseId, vehicleId, driverId, id]
        );

        // Obtén los datos actualizados
        const [rows] = await pool.query('SELECT * FROM shipments WHERE id = ?', [id]);

        // Asegurar de que 'rows' contiene al menos un registro
        if (rows.length > 0) {
            return rows[0]; // Devuelve el primer registro actualizado
        } else {
            throw new Error('No se encontraron datos para el ID proporcionado');
        }
    } catch (err) {
        throw new Error(`Error al actualizar los datos del envío: ${err.message}`);
    }
}

// Función para eliminar un envío por ID
export async function modelDelete(id) {
    try {
        const [[objectToDelete]] = await pool.query('SELECT * FROM shipments WHERE id = ?', [id]);
        await pool.query('DELETE FROM shipments WHERE id = ?', [id]);
        return objectToDelete;
    } catch (err) {
        throw new Error(`Error al eliminar el envío: ${err}`);
    }
}
