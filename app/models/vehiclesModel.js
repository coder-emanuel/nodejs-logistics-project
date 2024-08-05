import { pool } from "../../config/db.js";

// Función para ver toda la información de los vehículos
export async function viewAllInformation() {
    try {
        let vehiclesInfo = await pool.query('SELECT * FROM vehicles');
        vehiclesInfo = vehiclesInfo[0];
        return vehiclesInfo;
    } catch (err) {
        throw new Error(`Error al obtener toda la información de los vehículos: ${err}`);
    }
}

// Función para obtener información de un vehículo por ID
export async function modelByGetId(id) {
    try {
        const [[data]] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
        return data;
    } catch (error) {
        throw new Error(`Error al obtener el vehículo por ID: ${error}`);
    }
}

// Función para insertar nuevos datos en la tabla de vehículos
export async function InsertNewDataModel(model, year, driverId) {
    try {
        const [result] = await pool.query('INSERT INTO vehicles(model, year, driver_id) VALUES(?, ?, ?)', [model, year, driverId]);
        const [[newVehicle]] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [result.insertId]);
        return newVehicle;
    } catch (err) {
        throw new Error(`No fue posible insertar nuevos datos: ${err}`);
    }
}

// Función para actualizar datos en la tabla de vehículos
export async function modelsOfUpdate(model, year, driverId, id) {
    try {
        // Actualiza los datos del vehículo
        await pool.query('UPDATE vehicles SET model = ?, year = ?, driver_id = ? WHERE id = ?', [model, year, driverId, id]);

        // Obtén los datos actualizados
        const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);

        // Aseguarar de que 'rows' contiene al menos un registro
        if (rows.length > 0) {
            return rows[0]; // Devuelve el primer registro actualizado
        } else {
            throw new Error('No se encontraron datos para el ID proporcionado');
        }
    } catch (err) {
        throw new Error(`Error al actualizar los datos del vehículo: ${err.message}`);
    }
}

// Función para eliminar un vehículo por ID
export async function modelDelete(id) {
    try {
        const [[objectToDelete]] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
        await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
        return objectToDelete;
    } catch (err) {
        throw new Error(`Error al eliminar el vehículo: ${err}`);
    }
}
